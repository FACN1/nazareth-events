const express = require('express');
var server = express();

server.get('/', function(req, res){
  res.json({message: 'this is a useless object, but whatever'})
})

module.exports = server;
