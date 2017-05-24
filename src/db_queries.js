const connection = require('../database/db_connection.js')

const db = module.exports = {}

db.getEvents = (cb) => {
  // calls the callback with an array of all events
  connection.query('SELECT * FROM EVENTS', (err, res) => {
    if (err) {
      return cb(err)
    }
    cb(null, res.rows)
  })
}

db.getOrganizerByUsername = (username, cb) => {
  connection.query('SELECT * FROM ORGANIZERS WHERE username=$1', [username], (err, res) => {
    if (err) {
      return cb(err)
    }
    if (res.rows.length === 0) {
      // callback with null result if no organizer found
      return cb(null, null)
    }
    cb(null, res.rows[0])
  })
}
