const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const router = require('./routes/index.js');

const app = express();

app.set('port', process.env.PORT || '4000');

app.engine('hbs', hbs ({
  defaultLayout: 'index',
  layoutDir: path.join(__dirname, '..', 'views','layout'),
  partialsDir: path.join(__dirname, '..', 'views', 'partials'),
  extname: 'hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(router);
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

module.exports = app;
