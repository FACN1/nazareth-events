const tape = require('tape')
const request = require('supertest')
const server = require('../src/server.js')

tape('static file test: GET request to /css/style.css', t => {
  request(server)
    .get('/css/style.css')
    .end((err, res) => {
      if (err) throw err
      t.equal(res.status, 200, 'should return status code 200')
      t.ok(res.text.includes('body {'), 'should return css page containing test string "body {"')
      t.end()
    })
})

tape('route add-event test: request authentication to permit POST', t => {
  request(server)
    .post('/add-event')
    .end((err, res) => {
      if (err) throw err
      t.equal(res.status, 302, 'should return status code 302')
      t.ok(res.text.includes('Redirecting to /organisations/login'), 'should return the login page when we\'re not authenticated')
      t.end()
    })
})
