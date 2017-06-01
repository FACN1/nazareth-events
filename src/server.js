const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db_queries.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dateFormat = require('dateformat')
const cookieParser = require('cookie-parser')
const { formatEvents, addDays } = require('./helpers.js')

if (process.env.NODE_ENV !== 'production') require('env2')('./config.env')

const server = express()

server.use(express.static(path.join(__dirname, '../public')))
server.use(bodyParser.urlencoded({
  extended: true
}))
server.use(cookieParser())

// auth middleware
server.use((req, res, next) => {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // token is not valid
        return next()
      }
      // add to the request
      req.isAuthenticated = true
      req.username = decoded.username
      next()
    })
  } else {
    next()
  }
})

server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: {
    prettyDate: (date) => dateFormat(date, 'dddd d mmmm, yyyy'),
    prettyTime: (time) => time.toString().slice(0, 5)
  }
}))

server.set('view engine', 'hbs')

server.get('/', function (req, res) {
  // from date is taken from the querystring, or today if none provided
  const fromDate = req.query.d ? new Date(req.query.d) : new Date()
  const toDate = addDays(fromDate, 7)
  db.getEvents(fromDate, toDate, (err, events) => {
    if (err) {
      // to be improved
      return res.send('db error :(')
    }
    res.render('home', {
      datesWithEvents: formatEvents(events)
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

server.get('/event-form', (req, res) => {
  if (req.isAuthenticated) {
    return res.render('event-form', { username: req.username })
  }
  res.redirect('/organisations/login')
})

server.get('/organisations/login', (req, res) => {
  res.render('organisations_login')
})

//
//
server.post('/add-event', function (req, res) {
  // get the data from the request
  if (!req.isAuthenticated) {
    return res.redirect('/organisations/login')
  }
  const formData = req.body
  if (formData.organizer !== req.username) {
    // user is trying to add event for a different organzation
    return res.redirect('/organisations/login')
  }

  // add to the database
  db.addEvent(formData, (err) => {
    if (err) {
      throw err
    }
    // send back a response message
    res.send(JSON.stringify('Event added successfully'))
  })
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
        // set a cookie which is secure in production
        res.cookie('token', token, {
          secure: process.env.NODE_ENV === 'production',
          sameSite: true
        })
        // should ideally redirect to profile page or create event page.
        res.send('correct credentials')
      })
    }
  })
})

module.exports = server
