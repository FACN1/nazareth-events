const app = require('./server.js');
const http = require('http');

http.createServer(app).listen(app.get ('port'), function (){
  console.log('Server listening on port ', app.get('port'));
})
