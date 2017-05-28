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
  res.render('home', {
    datesWithEvents: [
      {
        date: 'Wednesday, 24 May',
        events: [
          {
            title: 'Pangea reunification',
            description: 'Australia joined Europe in Eurovision, now its time for something MORE!',
            time: '23:59',
            location: 'THE WORLD!!!'
          },
          {
            title: '@_@ Swirly glasses stories',
            description: 'WE all read books, but heres a guy who really can show off what he has learned',
            time: 'summer equinox',
            location: 'ON TOP OF A MOUNTAIN!!!'
          }
        ]
      },
      {
        date: 'Thursday, 25 May',
        events: [
          {
            title: 'Pangea destruction',
            description: 'Australia joined Europe in Eurovision, now its time for something MORE!',
            time: '00:00',
            location: 'LIWAN!!!'
          },
          {
            title: 'training on thorns',
            description: 'a traditional African festival in which strong fighters dance on thorns',
            time: '20:00-21:00',
            location: 'South-African-American African-American African Center'
          }
        ]
      },
      {
        date: 'Friday, 26 May',
        events: [
          {
            title: 'Khan El Basha history lessons',
            description: 'Hitsory lessons can be fun too...if you bring chocolates',
            time: '15:00-19:00',
            location: 'Khan El Basha'
          }
        ]
      }
    ]
  })
})

module.exports = server
