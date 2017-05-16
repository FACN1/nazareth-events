const router = require('express').Router();

const homePage = require('./home.js');
const eventTodayPage = require('./event-today.js');
const eventTomorrowPage = require('./event-tomorrow.js');

router.get('/', homePage);
router.get('/event-today', eventTodayPage);
router.get('/event-tomorrow', eventTomorrowPage);

module.exports = router
