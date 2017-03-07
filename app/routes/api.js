var router = require('express').Router();

// controllers
var system = require('../controllers/system');
var leaderboard = require('../controllers/leaderboard');

// routes
router.route('/status').get(system.checkStatus);
router.route('/athletes/sync').get(leaderboard.syncAthletes);

module.exports = router;
