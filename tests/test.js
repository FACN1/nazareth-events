const tape = require('tape')
const request = require('supertest')
const { formatEvents } = require('../src/helpers.js')
const server = require('../src/server.js')
const testData = require('./testData.js')

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

tape('home route test: GET request to /', t => {
  request(server)
    .get('/')
    .end((err, res) => {
      if (err) throw err
      t.equal(res.status, 200, 'should return status code 200')
      t.ok(res.text.includes('<title>Nazareth Events</title>'), 'should return home page containing test string "<title>Nazareth Events</title>"')
      t.end()
    })
})

tape('test formatEvents function', t => {
  testData.formatEvents.forEach(testData => {
    t.deepEqual(
      formatEvents(testData.input),
      testData.expectedOutput,
      testData.message)
  })
  t.end()
})

tape.onFinish(() => {
  // close db connections etc.
  process.exit()
})
