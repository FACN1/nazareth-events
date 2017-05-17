const router = require('express').Router();

const homePage = require('./home.js');
const mapPage = require('./map.js');

router.get('/', homePage);
router.get('/map', mapPage);

module.exports = router
