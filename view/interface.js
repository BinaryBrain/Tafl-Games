var socket = io.connect('http://localhost');

var players = {}
var groups = []
var myid = ""

socket.on('connect', function () {
  myid = socket.socket.sessionid
  
  $("#set-name").submit(function () {
    var name = $("#set-name #name").val()
    
    socket.emit('set-name', { name: name })
    
    return false;
  })

  $(".invite-btn").live('click', function () {
    socket.emit('invite-player', { pid: $(this).attr("data-pid") })
  })
  
  socket.on('error', function (err) { alert(err.type) })
  
  socket.on('welcome', function (data) {
    setUI("main")
    
    players = data.players
    groups = data.groups
    refreshPlayers(players, groups)
  })
  
  socket.on('new-player', function (data) {
    players[data.pid] = { pid: data.pid, name: data.name }
    refreshPlayers(players, groups)
  })
  
  socket.on('lost-player', function (data) {
    delete players[data.pid]
    refreshPlayers(players, groups)
  })
  
  socket.on('ask-join-group', function (data) {
    var inviter = data.inviter
    var gid = data.gid
    
    if(confirm(players[inviter].name+" is inviting you.\nDo you want to join his group?")) {
      socket.emit('accept-group', { gid: gid })
    }
    else {
      socket.emit('reject-group', { gid: gid })
    }
  })
});

function setUI(style) {
  $(".ui-block:not(."+style+")").fadeOut(400, function () {
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
  
  playersArr.forEach(function (player) {
    if(player.pid === myid)
      return false
    html += '<tr><td>'
    html += player.name
    html += '</td><td><a href="#invite-'+player.pid+'" data-pid="'+player.pid+'" title="Invite" class="invite-btn">+</a></td>'
    html += "</tr>"
  })

  if(html === "") html = "FOREVER ALONE!"
  
  $("#players table").html(html);
}

function sortPlayers(a, b) {
  if(a.name.toLowerCase() <= b.name.toLowerCase())
    return -1
  else
    return 1
}
