$(function () {
  $("#people .name").click(function () {
    alert($(this).attr("id"))
  })
  $("#games .game").click(function () {
    alert($(this).attr("id"))
  })
})
