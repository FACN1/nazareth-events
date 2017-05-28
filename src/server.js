const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db_queries.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dateFormat = require('dateformat')

require('env2')('./config.env')
const server = express()

server.use(express.static(path.join(__dirname, '../public')))
server.use(bodyParser.urlencoded({
  extended: true
}))

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

server.post('/authenticate', (req, res) => {
  const { username, password } = req.body
  db.getOrganizerByUsername(username, (err, organizer) => {
    if (err) {
      // to be improved
      return res.send(err.message)
    }
    if (!organizer) {
      // not ideal as it retains the /authenticate route in url
      return res.render('organisations_login', {
        errorMessage: 'username not recognised.'
      })
    } else {
      bcrypt.compare(password, organizer.password, (err, isCorrect) => {
        if (err) {
          // to be improved
          return res.send(err.message)
        }
        if (!isCorrect) {
          return res.render('organisations_login', {
            errorMessage: 'incorrect password.'
          })
        }
        const token = jwt.sign({username}, process.env.JWT_SECRET)
        // set a secure cookie
        res.cookie('token', token, {
          secure: true,
          sameSite: true
        })
        // should ideally redirect to profile page or create event page.
        res.send('correct credentials')
      })
    }
  })
})

module.exports = server
