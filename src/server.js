var express = require('express')
var server = express()
var hbs = require('express-handlebars')
var path = require('path')

server.use(express.static(path.join(__dirname, '../public')))

server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))

server.set('view engine', 'hbs')

server.get('/', function (req, res) {
  res.render('home')
})

// server.get('/events/:id', (req, res) => {
//   db.getEventById(req.params.id, (err, event) => {
//     if (err) {
//       return res.send('db error :(')
//     }
//     res.render('event_detail', event)
//   })
// })

server.get('/organisations/login', (req, res) => {
  res.render('organisations_login')
})

module.exports = server
