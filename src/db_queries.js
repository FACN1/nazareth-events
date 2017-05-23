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
