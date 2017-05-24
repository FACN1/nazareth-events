var express = require('express')
var server = express()
var hbs = require('express-handlebars')
var path = require('path')
var db = require('./db_queries.js')

server.use(express.static(path.join(__dirname, '../public')))

server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))

server.set('view engine', 'hbs')

server.get('/', function (req, res) {
  db.getEvents((err, events) => {
    if (err) {
      // to be improved
      return res.send('db error :(')
    }
    res.render('home', {
      events: events
    })
  })
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
