console.log("Starting Node Server...")

var express = require('express');
var app = express();

var views = "./view"
var resources = "./resources"

app.get('/', function(req, res){
  res.sendfile(views+'/canvas.html');
});

app.get('/resources/*', function(req, res){
  res.sendfile('./'+req.path);
});

app.get('/*', function(req, res){
  res.sendfile(views+req.path);
});

app.listen(9000);
