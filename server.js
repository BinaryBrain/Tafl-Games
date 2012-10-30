printInfo("Starting Node Server...")

var express = require('express')
var app = express()

var http = require('http')
var server = http.createServer(app)

var io = require('socket.io').listen(server)
var clients = {}
var players = []
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
      players.push({ pid: pid, name: name })
      socket.emit('welcome', { players: players, groups: groups })
      socket.broadcast.emit('new-player', { pid: pid, name: name })

      socket.set('name', name, function () {
        printInfo(pid+" has name: "+name)
        socket.on('invite-player', function (data) {
          var pid = data.pid
          printInfo(socket.id+" is inviting "+pid)
          
          if(clients[pid] === undefined) {
            socket.emit('error', { type: "ERROR_PLAYER_NOT_FOUND" })
            return;
          }
          
          var leaderID = socket.id
          
          socket.get('groupID', function (err, gid) {
            if(gid === null) {
              // Create a new group
              printGroup("Creating a new group. ID: "+gid)
              
              gid = groups.push([socket.id])-1
            }
            
            clients[pid].emit('ask-join-group', { leader: leaderID, group: gid }, function () {
              printGroup('Asking '+pid+" to join the group "+gid+" created by "+leaderID)
              
              socket.on('accept-group', function () {
                printGroup(pid+" accepted to join the group "+gid+" created by "+leaderID)
                
                groups[gid].push(pid)
                if(groups[gid].length === 2)
                  socket.broadcast.emit('new-group', { players: [leaderID, pid], gid: gid })
                else
                  socket.broadcast.emit('add-to-group', { player: pid, gid: gid })
              })
              
              socket.on('reject-group', function () {
                printGroup(pid+" rejected to join the group "+gid+" created by "+leaderID)
                
                if(groups[gid].length === 1) {
                  printGroup("Group "+gid+" has only one player in it. Removing "+gid)
                  groups.splice(gid, 1)
                }
                
                leader.emit('invite-rejected', { by: pid, group: gid })
              })
            })
            
            //socket.set('groupID', groupID)          
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
          socket.broadcast.emit('lost-player', socket.id)
        })
      })
    }
  })
  
  socket.on('disconnect', function() {
    delete clients[socket.id]
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

// COLORFUL PRINTING IS FNU
function printInfo(s, color, prefix) {
  var ansi = require('ansi')
  var cursor = ansi(process.stdout);
  
  if(!color)
    color = "#66FF66";
  
  if(!prefix)
    prefix = "TAFL";
  
  cursor.hex(color)
  console.log("-- "+prefix+" -- "+s)
  cursor.reset()
}

function printGroup(s) {
  printInfo(s, "00FF00", "Group")
}
