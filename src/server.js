const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db_queries.js')

const server = express()

server.use(express.static(path.join(__dirname, '../public')))
server.use(bodyParser.urlencoded({
  extended: true
}))

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

server.get('/organisations/login', (req, res) => {
  res.render('organisations_login')
})

server.post('/authenticate', (req, res) => {
  const { username, password } = req.body
  db.getOrganizationByUsername(username, (err, organization) => {
    if (err) {
      return res.send('db error :(')
    }
    if (organization === null) {
      return res.render('organisations_login', {
        errorMessage: 'username not recognised.'
      })
    } else if (password !== user.password) {
      return res.render('organisations_login', {
        errorMessage: 'incorrect password.'
      })
    }
    // generate token
    // send token
  })
})

module.exports = server
