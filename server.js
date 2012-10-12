console.log("Starting Node Server...")

var express = require('express')
var app = express()

var http = require('http')
var server = http.createServer(app)

var io = require('socket.io').listen(server)
var clients = []

var util = require('util');

var views = "./view"
var resources = "./resources"

server.listen(9000)

app.get('/', function (req, res) {
  res.sendfile(views+'/canvas.html')
})

app.get('/socket', function (req, res) {
  res.sendfile(views+'/socket.html')
})

app.get('/resources/*', function (req, res) {
  res.sendfile('./'+req.path)
})

app.get('/*', function(req, res) {
  res.sendfile(views+req.path)
})

io.sockets.on('connection', function (socket) {
  clients[socket.id] = socket
  console.log("New connection:\n  ID: "+socket.id+"\n  IP: "+socket.handshake.address.address + ":" + socket.handshake.address.port+"\n");
  
  socket.broadcast.emit('new-player', {})
  
  socket.on('my other event', function (data) {
    console.log(data)
  })
  
  socket.on('disconnect', function() {
    clients.splice(socket.id, 1)
  })
})
