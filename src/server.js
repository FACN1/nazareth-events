var express = require('express')
var server = express()
var hbs = require('express-handlebars')
var path = require('path')
var db = require('./db_queries.js')
const dateFormat = require('dateformat')
const cookieParser = require('cookie-parser')

server.use(express.static(path.join(__dirname, '../public')))
server.use(cookieParser())

// auth middleware
// server.use((req, res, next) => {
//   if (req.cookies.token) {
//     console.log('token here!')
//     // check if token is legit
//     jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         // token is not valid
//         return
//       }
//       // else token is valid
//       // set some stuff with req.body, username etc.
//       req.auth.isAuthenticated = true
//       req.auth.username = decoded.username
//     })
//   }
//   next()
// })

server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: {
    formatDate: (date) => dateFormat(date, 'dddd d mmmm, yyyy')
  }
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

server.get('/events/:id', (req, res) => {
  db.getEventById(req.params.id, (err, event) => {
    if (err) {
      return res.send('db error :(')
    }
    res.render('event_detail', event)
  })
})

server.get('/organisations/login', (req, res) => {
  res.render('organisations_login')
})

module.exports = server
