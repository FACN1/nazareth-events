const connection = require('../database/db_connection.js')
const { formatDateForSQL } = require('./helpers.js')

const db = module.exports = {}

db.getEvents = (fromDate, toDate, cb) => {
  // gets events between sepecified dates
  connection.query(
    'SELECT * FROM EVENTS WHERE date>=$1 AND date<$2',
    [formatDateForSQL(fromDate), formatDateForSQL(toDate)],
    (err, res) => {
      if (err) {
        return cb(err)
      }
      cb(null, res.rows)
    }
  )
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

// const
db.addEvent = (data, cb) => {
  connection.query(
    'INSERT INTO Events (title, location, organizer, start_time, end_time, cost, date, type, description, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',
    [data.title, data.location, data.organizer, data.start_time, data.end_time, data.cost, data.date, data.type, data.description, data.img_url],
    cb)
}
