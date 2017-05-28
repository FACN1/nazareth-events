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

db.getEventById = (id, cb) => {
  connection.query('SELECT * FROM EVENTS WHERE id=$1', [id], (err, res) => {
    if (err) {
      return cb(err)
    }
    if (res.rows.length === 0) {
      return cb(new Error(`no event with id=${id}`))
    }
    cb(null, res.rows[0])
  })
}
