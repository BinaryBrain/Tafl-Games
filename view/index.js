$(function () {
  $("#people .name").live("click", function () {
    console.log($(this).attr("id"))
  })
  
  $("#games .game").live("click", function () {
    console.log($(this).attr("id"))
    showTeams();
  })
  
  $("#teamMaking #readyButton").live("click", function () {
    alert("Launching the game!")
  })
  
  $("#notifs .close").live("click", function () {
    var notif = $(this).parent()
    notif.animate({ left: -500 }, function () {
      notif.remove()
    })
  })
  
  showGames()
  welcomeNotifs()
})

function showGames() {
  $.get("/games.html", function (data) {
    $("#frame").html(data)
  })
}

function showTeams() {
  $.get("/teams.html", function (data) {
    $("#frame").html(data)
  })
}

function newNotif(title, content) {
  var id = Math.floor(Math.random()*10000)+""
  var html = '<div class="notif" id="'+id+'"><div class="close"></div><h3>'+title+'</h3><p>'+content+'</p></div>'
  $("#notifs").append(html)
  $("#"+id).animate({ left: 0 })
}

function welcomeNotifs() {
  setTimeout(function () {
    newNotif("Hello!", "Welcome to this wonderful online gaming plateforme!")
  }, 5000)
  
  setTimeout(function () {
    newNotif("Games", "The main frame show you every games you can play on this web site with your friends.")
  }, 8000)
  
  setTimeout(function () {
    newNotif("Notifications", "Oh! By the way, I'm a notification. You may see me when I will have some informations for you.")
  }, 13000)
}
