var express = require('express')
var server = express()
var hbs = require('express-handlebars')
var path = require('path')
const bodyParser = require('body-parser')

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
  res.render('home')
})

server.get('/organisations/login', (req, res) => {
  res.render('organisations_login')
})

// server.post('/authenticate', (req, res) => {
//   const { username, password } = req.body
//   db.getOrganizationByUsername(username, (err, organization) => {
//     if (err) {
//       return res.send('db error :(')
//     }
//     if (organization === null) {
//       return res.render('organisations_login', {
//         errorMessage: 'username not recognised.'
//       })
//     } else if (password !== user.password) {
//       return res.render('organisations_login', {
//         errorMessage: 'incorrect password.'
//       })
//     }
//     // generate token
//     // send token
//   })
// })

module.exports = server
