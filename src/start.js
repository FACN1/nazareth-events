const server = require('./server.js')
const port = process.env.PORT || 8080

server.listen(port, function () {
  console.log(`server listening on port ${port}!`)
})
