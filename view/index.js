$(function () {
  $("#people .name").live("click", function () {
    console.log($(this).attr("id"))
  })
  
  $("#games .game").live("click", function () {
    console.log($(this).attr("id"))
    showTeams();
  })
  
  showGames();
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
