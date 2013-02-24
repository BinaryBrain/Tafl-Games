$(function () {
  $("#people .name").live("click", function () {
    console.log($(this).attr("id"))
  })
  
  $("#games .game").live("click", function () {
    console.log($(this).attr("id"))
    showTeams()
    newNotif("Invite your friends", "Just drag and drop people you want to invite.")
  })
  
  $("#login #loginButton").live("click", function () {
    var user = $("#login #user").val()
    var password = $("#login #password").val()
    
    console.log(user, password)
    showGames()
    
    newNotif("Games", "The main frame show you every games you can play on this web site with your friends.")
  })
  
  $("#teamMaking #cancelButton").live("click", function () {
    showGames()
  })
  
  $("#teamMaking #readyButton").live("click", function () {
    alert("Launching the game!")
  })
  
  $("#notifs .close").live("click", function () {
    var notif = $(this).parent()
    closeNotif(notif)
  })
  
  showLogin()
  welcomeNotifs()
})

function showLogin() {
  $.get("/login.html", function (data) {
      changeFrame(data)
  })
}

function showGames() {
  $.get("/games.html", function (data) {
      changeFrame(data)
  })
}

function showTeams() {
  $.get("/teams.html", function (data) {
    changeFrame(data)
  })
}

function changeFrame(data) {
  if($("#frame").html() !== "") {
    $("#frame > *").fadeOut(function () {
      $("#frame").html(data)
      $("#frame > *").css({ display: "none" })
      $("#frame > *").fadeIn()
    })
  }
  
  else
    $("#frame").html(data)
}

function newNotif(title, content) {
  var id = Math.floor(Math.random()*10000)+""
  var html = '<div class="notif" id="'+id+'"><div class="close"></div><h3>'+title+'</h3><p>'+content+'</p></div>'
  $("#notifs").append(html)
  $("#notifs #"+id).animate({ left: 0 })
  
  setTimeout(function () {
    closeNotif($("#notifs #"+id))
  }, 6000)
}

function closeNotif(notif) {
  notif.animate({ left: -500 }, function () {
    notif.remove()
  })
}

function welcomeNotifs() {
  setTimeout(function () {
    newNotif("Hello!", "Welcome to this wonderful online gaming plateforme!")
  }, 5000)
  
  setTimeout(function () {
    newNotif("Notifications", "Oh! By the way, I'm a notification. You may see me when I will have some informations for you.")
  }, 7000)
}
