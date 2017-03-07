var router = require('express').Router();

// controllers
var system = require('../controllers/system');
var leaderboard = require('../controllers/leaderboard');

// routes
router.route('/status').get(system.checkStatus);

router.route('/athletes/sync').get(leaderboard.syncAthletes);
router.route('/ranking').get(leaderboard.createRanking);
router.route('/leaderboard').get(leaderboard.get);

module.exports = router;
