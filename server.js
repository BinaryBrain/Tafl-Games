printInfo("Starting Node Server...")

var express = require('express')
var app = express()

var http = require('http')
var server = http.createServer(app)

var io = require('socket.io').listen(server)
var clients = {}
var players = {}
var games   = []

var util = require('util')

var taflgame = require('./engine')

var views = "./view"
var resources = "./resources"

server.listen(9000)

// Serve web pages
app.get('/', function (req, res) {
  res.sendfile(views+'/index.html')
})

app.get('/canvas', function (req, res) {
  res.sendfile(views+'/canvas.html')
})

app.get('/resources/*', function (req, res) {
  res.sendfile('./'+req.path)
})

app.get('/favicon.ico', function(req, res) {
  res.statusCode = 404;
  res.end;
})

app.get('/*', function(req, res) {
  res.sendfile(views+req.path)
})

// Handle web sockets
io.sockets.on('connection', socketOnConnection)

function nickUsed(nick) {
  // TODO: Could be more optimized (use an array of name?)
  var used = false
  for(var i in clients) {
    clients[i].get('name', function (err, name) {
      if(err) throw err

      else if(name === nick) {
        used = true
      }
    })
  }

  return used
}

function nickDefined(id) {
  // TODO: Could be more optimized (use an array of name?)
  var ret = false
  clients[id].get('name', function (err, name) {
    if(err) throw err
    
    ret = !!name
  })
  return ret;
}

function validNick(name) {
  var pattern = /^\w+(\s\w+)*$/gi;
  return pattern.test(name);
}

// Group Helper
function isAGroup(name) {
  return name.substr(1, 6) === "group-"
}

function isInAGroup(pid) {
  for(var i in io.sockets.manager.roomClients[pid]) {
    if(isAGroup(i))
      return true
  }
  return false
}

function getGroupName(pid) {
  if(!isInAGroup(pid)) throw new Exception("ERROR_PLAYER_NOT_IN_A_GROUP")

  for(var i in io.sockets.manager.roomClients[pid]) {
    if(isAGroup(i))
      return i.substr(1)
  }
}

function roomsGroupsToArray() {
  var groups = []
  
  for(var i in io.sockets.manager.rooms) {
    if(isAGroup(i))
      groups.push(i.substr(1))
  }

  return groups
}

function getGroupsArray() {
  var groups = {}
  
  var rooms = roomsGroupsToArray()
  rooms.forEach(function(room) {
    groups[room] = []
    io.sockets.clients(room).forEach(function(player) {
      groups[room].push(player.id)
    })
  })
  
  return groups
}

// COLORFUL PRINTING IS FNU
function printInfo(s, color, prefix) {
  var ansi = require('ansi')
  var cursor = ansi(process.stdout);
  
  if(!color)
    color = "#00FF66";
  
  if(!prefix)
    prefix = "TAFL";
  
  cursor.hex(color)
  console.log("-- "+prefix+" -- "+s)
  cursor.reset()
}

function printGroup(s) {
  printInfo(s, "00FF00", "Groups")
}

// UNNESTED FUNCTIONS
function socketOnConnection(socket) {
  // FIXME: Index cannot be a string (couldn't remember why did I write this...)
  clients[socket.id] = socket
  
  printInfo("New connection:\n  ID: "+socket.id+"\n  IP: "+socket.handshake.address.address + ":" + socket.handshake.address.port)
  
  socket.on('set-name', function (data) {
    socketOnSetName(socket, data)
  })
  
  socket.on('disconnect', function () {
    if(isInAGroup(socket.id))
      socketOnLeaveGroup(socket)
    
    delete clients[socket.id]
    delete players[socket.id]
    printInfo(socket.id+" disconnected")
  })
}

function socketOnSetName(socket, data) {
  var name = data.name
  
  var pid = socket.id
  printInfo("Setting name: "+name+" for: "+pid)
  
  if(nickUsed(name))
    socket.emit('error', { type: "ERROR_NICKNAME_ALREADY_USED" })
  else if(!validNick(name))
    socket.emit('error', { type: "ERROR_NICKNAME_CONTAINS_INVALID_CHARACTERS" })
  else if(nickDefined(pid))
    socket.emit('error', { type: "ERROR_NICKNAME_CANNOT_BE_CHANGED" })
  else {
    players[pid] = { pid: pid, name: name }
    socket.emit('welcome', { players: players, groups: getGroupsArray() })
    socket.broadcast.emit('new-player', { pid: pid, name: name })
    
    socket.set('name', name, function () {
      printInfo(pid+" has name: "+name)
      
      socket.join("general")
      
      socket.on('invite-player', function (data) {
        socketOnInvitePlayer(socket, data)
      })
      
      socket.on('new-game', function (data) {
        socketOnNewGame(socket, data)
      })
      
      socket.on('leave-group', function () {
        socketOnLeaveGroup(socket)
      })
      
      socket.on('disconnect', function () {
        socket.broadcast.emit('lost-player', { pid: socket.id })
      })
    })
  }
}

function socketOnNewGame(socket, data) {
  socket.get('nickname', function (err, name) {
    var game = new Game()
    game.init([new Player(socket.id, name)])
    game.load(0)
    games[socket.id] = game
  })
}

function socketOnInvitePlayer(socket, data) {
  var pid = data.pid
  var inviter = socket.id
  
  printGroup("Player: "+inviter+" is inviting: "+pid)
  
  if(clients[pid] === undefined) {
    socket.emit('error', { type: "ERROR_PLAYER_NOT_FOUND" })
    return
  }
  else if(pid === inviter) {
    socket.emit('error', { type: "ERROR_CANNOT_INVITE_YOURSELF" })
    return
  }
  else if(isInAGroup(pid)) {
    socket.emit('error', { type: "ERROR_PLAYER_ALREADY_IN_A_GROUP" })
    return
  }
  
  var gid = ""
  
  if(!isInAGroup(inviter)) {
    gid = "group-"+inviter
    socket.join(gid)
    printGroup("Creating a new group: "+gid)
    
    io.sockets.emit('new-group', { players: [inviter], gid: gid })
  }
  else {
    gid = getGroupName(inviter)
  }
  
  clients[pid].emit('ask-join-group', { inviter: inviter, gid: gid })
  printGroup('Asking '+pid+" to join the group: "+gid+" created by: "+inviter)

  // FIXME: This cause multiple calls if 'socketOnInvitePlayer' is called multiple times (and it will).
  clients[pid].on('accept-group', function (data) {
    socketOnAcceptGroup(clients[pid], data)
  })
  
  clients[pid].on('reject-group', function (data) {
    socketOnRejectGroup(clients[pid], data)
  })
  // END of FIXME
}

function socketOnAcceptGroup(socket, data) {
  var gid = data.gid
  var pid = socket.id
  var inviter = data.inviter
  
  printGroup(pid+" accepted to join the group: "+gid+" created by: "+inviter)
  
  clients[pid].join(gid)
  
  printGroup("Size of group: "+gid+" is: "+io.sockets.clients(gid).length)
  io.sockets.emit('add-to-group', { player: pid, gid: gid })
}

function socketOnRejectGroup(socket, data) {
  var pid = socket.id
  var gid = data.gid
  var inviter = data.inviter
  
  printGroup(pid+" rejected to join the group: "+gid)
  
  clients[inviter].emit('invite-rejected', { pid: pid, gid: gid })
}

function socketOnLeaveGroup(socket) {
  var pid = socket.id
  var gid = getGroupName(pid)
  
  printGroup("Player: "+pid+" is leaving group: "+gid)
  
  clients[pid].leave(gid)
  
  printGroup("Size of group: "+gid+" is: "+io.sockets.clients(gid).length)
}
