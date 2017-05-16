module.exports = (req, res, next) => {
  res.render('event-tomorrow', {title:'events of tomorrow'});
}
