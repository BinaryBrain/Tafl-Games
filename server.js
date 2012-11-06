printInfo("Starting Node Server...")

var express = require('express')
var app = express()

var http = require('http')
var server = http.createServer(app)

var io = require('socket.io').listen(server)
var clients = {}
var players = {}
var groups  = []
var games   = []

var util = require('util')

var taflgame = require('./engine')

var views = "./view"
var resources = "./resources"

server.listen(9000)

// Serve web pages
app.get('/', function (req, res) {
  res.sendfile(views+'/interface.html')
})

app.get('/canvas', function (req, res) {
  res.sendfile(views+'/canvas.html')
})

app.get('/resources/*', function (req, res) {
  res.sendfile('./'+req.path)
})

app.get('/*', function(req, res) {
  res.sendfile(views+req.path)
})

// Handle web sockets
io.sockets.on('connection', function (socket) {
  // FIXME: Index cannot be a string
  clients[socket.id] = socket
  
  printInfo("New connection:\n  ID: "+socket.id+"\n  IP: "+socket.handshake.address.address + ":" + socket.handshake.address.port)
  
  socket.on('set-name', function (data) {
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
      socket.emit('welcome', { players: players, groups: groups })
      socket.broadcast.emit('new-player', { pid: pid, name: name })
      
      socket.set('name', name, function () {
        printInfo(pid+" has name: "+name)
        
        socket.join("general")
        
        socket.on('invite-player', function (data) {
          var pid = data.pid
          
          printInfo("Player: "+socket.id+" is inviting: "+pid)
          
          var inviter = socket.id
          var gid = ""
          
          if(!isInAGroup(socket.id)) {
            gid = "group-"+socket.id
            socket.join(gid)
            printGroup("Creating a new group: "+gid)
          }
          else {
            gid = getGroupName(socket.id)
          }
          
          if(clients[pid] === undefined) {
            socket.emit('error', { type: "ERROR_PLAYER_NOT_FOUND" })
            return;
          }
          
          clients[pid].emit('ask-join-group', { inviter: inviter, gid: gid }, function () {
            printGroup('Asking '+pid+" to join the group: "+gid+" created by: "+inviter)
            
            clients[pid].on('accept-group', function () {
              printGroup(pid+" accepted to join the group: "+gid+" created by: "+inviter)
              
              clients[pid].join(gid)
              
              printGroup("Size of group: "+gid+" is: "+io.sockets.clients(gid).length)
              if(io.sockets.clients(gid).length === 2)
                socket.broadcast.emit('new-group', { players: [inviter, pid], gid: gid })
              else
               socket.broadcast.emit('add-to-group', { player: pid, gid: gid })
            })
            
            // FIXME: N'avait (est-ce toujours le cas?) rien a faire ici. Comportement à réfléchir.
            clients[pid].on('reject-group', function (data) {
              printGroup(pid+" rejected to join the group: "+gid)
              
              if(io.sockets.clients(gid).length === 1) {
                printGroup("Group: "+gid+" has only one player in it. Removing it.")
                socket.leave(gid)
              }
              
              socket.emit('invite-rejected', { by: pid, gid: gid })
            })
          })
        })
      
        socket.on('new-game', function (data) {
          socket.get('nickname', function (err, name) {
            var game = new Game()
            game.init([new Player(socket.id, name)])
            game.load(0)
            games[socket.id] = game
          })
        })
        
        socket.on('disconnect', function() {
          socket.broadcast.emit('lost-player', { pid: socket.id })
        })
      })
    }
  })
  
  socket.on('disconnect', function() {
    delete clients[socket.id]
    delete players[socket.id]
    printInfo(socket.id+" disconnected")
  })
})

function nickUsed(nick) {
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

function isInAGroup(pid) {
  var inagroup = false
  for(var i in io.sockets.manager.roomClients[pid]) {
    if(i.substr(1, 6) == "group-")
      inagroup = true
  }
  return inagroup
}

function getGroupName(pid) {
  if(!isInAGroup(pid)) throw new Exception("PLAYER_NOT_IN_A_GROUP")
  for(var i in io.sockets.manager.roomClients[pid]) {
    if(i.substr(1, 6) == "group-")
      return i.substr(1)
  }
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
  printInfo(s, "00FF00", "Group")
}
