const fs = require('fs')
const env = require('env2') //this is so that env will work
env('./config.env') // this is so others won't abuse our code

  const connection = require('./db_connection.js')
  const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString()
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      throw (err)
    }
    else {
      console.log('Database built successfuly');
    }
  })
