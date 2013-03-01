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
  
  var lastSlot = false
  var lastBuddy
  
  $("#people .buddy").live("dragstart", function () {
    lastBuddy = $(this)
  })
  $("#teams .slot.open").live("dragenter", function () {
    lastSlot = $(this)
    $(this).animate({ opacity: 1 })
  })
  $("#teams .slot.open").live("dragleave", function () {
    lastSlot = false
    $(this).animate({ opacity: 0.7 })
  })
  $("#people .buddy").live("dragend", function () {
    if(lastSlot) {
      lastSlot.addClass("pending")
      lastSlot.removeClass("open")
      
      var id= "canvasloader"+Math.floor(Math.random()*1000000)+""
      lastSlot.html('<div class="canvasloader" id="'+id+'"></div><div class="name">'+lastBuddy.children(".name").html() + '</div>')
      
      var cl = new CanvasLoader(id);
      cl.setDiameter(15); // default is 40
      cl.setColor('#F1BF28'); // default is '#000000'
      cl.setDensity(45); // default is 40
      cl.setRange(0.3); // default is 1.3
      cl.show(); // Hidden by default
    }
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
  }, 15000)
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
