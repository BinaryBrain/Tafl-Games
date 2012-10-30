var socket = io.connect('http://localhost');
socket.on('connect', function () {
  console.log("Emitting...")

  $("#set-name").submit(function() {
    var name = $("#set-name #name").val()
    
    socket.emit('set-name', { name: name })
    
    return false;
  })
});
