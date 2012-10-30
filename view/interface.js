var socket = io.connect('http://localhost');

var players = {}
var groups = []

socket.on('connect', function () {
  console.log("Emitting...")

  $("#set-name").submit(function() {
    var name = $("#set-name #name").val()
    
    socket.emit('set-name', { name: name })
    
    return false;
  })
  
  socket.on('error', function(err) { alert(err.type) })
  
  socket.on('welcome', function(data) {
    setUI("main")
    
    players = data.players
    groups = data.groups
    refreshPlayers(players, groups)
  })

  socket.on('new-player', function(data) {
    players[data.pid] = { pid: data.pid, name: data.name }
    refreshPlayers(players, groups)
  })
  
  socket.on('lost-player', function(data) {
    delete players[data.pid]
    refreshPlayers(players, groups)
  })
});

function setUI(style) {
  $(".ui-block:not(."+style+")").fadeOut(400, function() {
    $("."+style).fadeIn()
  })
}

function refreshPlayers(players, groups) {
  var html = ""
  var playersArr = []
  
  for(var i in players) {
    playersArr.push(players[i])
  }
  
  playersArr.sort(sortPlayers)
  
  playersArr.forEach(function(player) {
    html += '<li title="'+player.pid+'">'
    html += player.name
    html += "</li>"
  })
  
  $("#players ul").html(html);
}

function sortPlayers(a, b) {
  if(a.name.toLowerCase() <= b.name.toLowerCase())
    return -1
  else
    return 1
}
