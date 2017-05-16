module.exports = (req, res, next) => {
  res.render('event-today', {title: 'events of today'});
}
