var socket = io.connect('http://localhost');
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
    refreshPlayers(data.players, data.groups)
  })
});

function setUI(style) {
  $(".ui-block:not(."+style+")").fadeOut(400, function() {
    $("."+style).fadeIn()
  })
}

function refreshPlayers(players, groups) {
  var html = "";

  players.sort(sortPlayers)
  
  players.forEach(function(player) {
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

 
