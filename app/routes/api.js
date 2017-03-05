var router = require('express').Router();

// controllers
var system = require('../controllers/system');

// routes
router.route('/status').get(system.checkStatus);

module.exports = router;
