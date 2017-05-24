const tape = require('tape')
const request = require('supertest')
const server = require('../src/server.js')

tape('static file test: GET request to /css/style.css', t => {
  request(server)
    .get('/css/style.css')
    .end(function (req, res) {
      t.equal(res.status, 200, 'should return status code 200')
      t.ok(res.text.includes('body {'), 'should return css page containing test string "body {"')
      t.end()
    })
})
