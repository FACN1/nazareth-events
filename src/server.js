var express = require('express')
var server = express() // remember this!
var hbs = require('express-handlebars')
var path = require('path');

server.use(express.static(path.join(__dirname, '../public')))

server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))

server.set('view engine', 'hbs')

server.get('/', function (req, res) {
  res.render('home')
})

module.exports = server


// const express = require('express');
// var server = express();
//
// server.get('/', function(req, res){
//   res.json({message: 'this is a useless object, but whatever'})
// })
//
// module.exports = server;
