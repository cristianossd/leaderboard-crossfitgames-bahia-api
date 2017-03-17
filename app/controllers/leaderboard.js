var request = require('request');
var async = require('async');
var fs = require('fs');
var Athlete = require('../models/athlete');

var URL = 'https://games.crossfit.com/competitions/api/v1/competitions/open/2017/leaderboards?affiliate=';

var affiliates = JSON.parse(fs.readFileSync('data/affiliates.json', 'utf8'));

module.exports.syncAthletes = function(req, res, next) {
  affiliates.forEach(affiliate => {
    request(URL + affiliate.id, function(err, response, body) {
      var athletes = JSON.parse(response.body).athletes;

      if (athletes.length > 0) {
        athletes.forEach((athlete) => {
          if (!isScale(athlete))
            createAthlete(athlete, affiliate);
          // else
          //   console.log('Scaled: ' + athlete.name);
        });
      }
    });
  });

  res.sendStatus(200);
};

module.exports.createRanking = function(req, res, next) {
  /* Men wod1 */
  Athlete.find({sex: 'm'}).sort({wod1Score: -1, wod1TieBreak: 1}).exec(function(err, athletes) {
    if (err) console.log(err);

    var pos = 1, next = 1, prev = 0, prevTieBreak = 0, prevRank = 1;
    async.eachSeries(athletes, function(athlete, callback) {
      var rank = pos;

      if (athlete.wod1Score == prev && athlete.wod1TieBreak == prevTieBreak) {
        rank = prevRank;
      } else {
        next++;
        prevRank = pos;
        pos = next;
      }

      prev = athlete.wod1Score;
      prevTieBreak = athlete.wod1TieBreak;

      Athlete.update({id: athlete.id}, {$set: {wod1Rank: rank}}, function(err, result) {
        if (err) console.log(err);

        console.log('Updated rank of ' + athlete.name);
        callback();
      });
    });
  });

  /* Men wod2 */
  Athlete.find({sex: 'm'}).sort({wod2Score: -1, wod2TieBreak: 1}).exec(function(err, athletes) {
    if (err) console.log(err);

    var pos = 1, next = 1, prev = 0, prevTieBreak = 0, prevRank = 1;
    async.eachSeries(athletes, function(athlete, callback) {
      var rank = pos;

      if (athlete.wod2Score == prev && athlete.wod2TieBreak == prevTieBreak) {
        rank = prevRank;
      } else {
        next++;
        prevRank = pos;
        pos = next;
      }

      prev = athlete.wod2Score;
      prevTieBreak = athlete.wod2TieBreak;

      Athlete.update({id: athlete.id}, {$set: {wod2Rank: rank}}, function(err, result) {
        if (err) console.log(err);

        console.log('Updated rank of ' + athlete.name);
        callback();
      });
    });
  });

  // /* Men wod3 */
  Athlete.find({sex: 'm'}).sort({wod3Score: -1, wod3TieBreak: 1}).exec(function(err, athletes) {
    if (err) console.log(err);

    var pos = 1, next = 1, prev = 0, prevTieBreak = 0, prevRank = 1;
    async.eachSeries(athletes, function(athlete, callback) {
      var rank = pos;

      if (athlete.wod3Score == prev && athlete.wod3TieBreak == prevTieBreak) {
        rank = prevRank;
      } else {
        next++;
        prevRank = pos;
        pos = next;
      }

      prev = athlete.wod3Score;
      prevTieBreak = athlete.wod3TieBreak;

      Athlete.update({id: athlete.id}, {$set: {wod3Rank: rank}}, function(err, result) {
        if (err) console.log(err);

        console.log('Updated rank of ' + athlete.name);
        callback();
      });
    });
  });

  /* Women wod1 */
  Athlete.find({sex: 'f'}).sort({wod1Score: -1, wod1TieBreak: 1}).exec(function(err, athletes) {
    if (err) console.log(err);

    var pos = 1, next = 1, prev = 0, prevTieBreak = 0, prevRank = 1;
    async.eachSeries(athletes, function(athlete, callback) {
      var rank = pos;

      if (athlete.wod1Score == prev && athlete.wod1TieBreak == prevTieBreak) {
        rank = prevRank;
      } else {
        next++;
        prevRank = pos;
        pos = next;
      }

      prev = athlete.wod1Score;
      prevTieBreak = athlete.wod1TieBreak;

      Athlete.update({id: athlete.id}, {$set: {wod1Rank: rank}}, function(err, result) {
        if (err) console.log(err);

        console.log('Updated rank of ' + athlete.name);
        callback();
      });
    });
  });

  /* Women wod2 */
  Athlete.find({sex: 'f'}).sort({wod2Score: -1, wod2TieBreak: 1}).exec(function(err, athletes) {
    if (err) console.log(err);

    var pos = 1, next = 1, prev = 0, prevTieBreak = 0, prevRank = 1;
    async.eachSeries(athletes, function(athlete, callback) {
      var rank = pos;

      if (athlete.wod2Score == prev && athlete.wod2TieBreak == prevTieBreak) {
        rank = prevRank;
      } else {
        next++;
        prevRank = pos;
        pos = next;
      }

      prev = athlete.wod2Score;
      prevTieBreak = athlete.wod2TieBreak;

      Athlete.update({id: athlete.id}, {$set: {wod2Rank: rank}}, function(err, result) {
        if (err) console.log(err);

        console.log('Updated rank of ' + athlete.name);
        callback();
      });
    });
  });

  /* Women wod3 */
  Athlete.find({sex: 'f'}).sort({wod3Score: -1, wod3TieBreak: 1}).exec(function(err, athletes) {
    if (err) console.log(err);

    var pos = 1, next = 1, prev = 0, prevTieBreak = 0, prevRank = 1;
    async.eachSeries(athletes, function(athlete, callback) {
      var rank = pos;

      if (athlete.wod3Score == prev && athlete.wod3TieBreak == prevTieBreak) {
        rank = prevRank;
      } else {
        next++;
        prevRank = pos;
        pos = next;
      }

      prev = athlete.wod3Score;
      prevTieBreak = athlete.wod3TieBreak;

      Athlete.update({id: athlete.id}, {$set: {wod3Rank: rank}}, function(err, result) {
        if (err) console.log(err);

        console.log('Updated rank of ' + athlete.name);
        callback();
      });
    });
  });

  res.sendStatus(200);
};

module.exports.get = function(req, res, next) {
  Athlete.find().exec(function(err, athletes) {
    athletes.forEach((athlete, index) => {
      athlete.overallScore = athlete.wod1Rank + athlete.wod2Rank + athlete.wod3Rank;

      if (athlete.overallScore == undefined) {
        console.log(athlete);
      }

      athlete.save(function(err, updatedAthlete) {
        if (err) console.log(err);

        console.log('Overall score updated for ' + updatedAthlete.name);
      });
    });
  });

  res.sendStatus(200);
};

module.exports.generate = function(req, res, next) {
  generateJSON();
  res.sendStatus(200);
};

/* protected */

function createAthlete(athlete, affiliate) {

  var _sex = getSex(athlete.divisionid);

  var _wod1Display = athlete.scores[0].scoredisplay;
  var _wod1Score = getScoreWithTimeCap(athlete.scores[0].scoredisplay, 225);
  var _tieBrealWod1 = (athlete.scores[0].scoredetails) ? athlete.scores[0].scoredetails.time : null;

  var _wod2Display = athlete.scores[1].scoredisplay;
  var _wod2Score = Number(athlete.scores[1].scoredisplay.replace(' reps', ''));
  var _tieBrealWod2 = (athlete.scores[1].scoredetails) ? athlete.scores[1].scoredetails.time : null;

  var _wod3Display = athlete.scores[2].scoredisplay;
  var _wod3Score = Number(athlete.scores[2].scoredisplay.replace(' reps', ''));
  var _tieBrealWod3 = (athlete.scores[2].scoredetails) ? athlete.scores[2].scoredetails.time : null;

  var newAthlete = new Athlete({
    id: athlete.userid,
    name: athlete.name,
    affiliate: affiliate.name,
    sex: _sex,
    wod1Display: _wod1Display,
    wod1Score: _wod1Score,
    wod1TieBreak: _tieBrealWod1,
    wod2Display: _wod2Display,
    wod2Score: _wod2Score,
    wod2TieBreak: _tieBrealWod2,
    wod3Display: _wod3Display,
    wod3Score: _wod3Score,
    wod3TieBreak: _tieBrealWod3
  });

  newAthlete.save(function(err, athleteResult) {
    if (err) console.log(err);

    console.log(athleteResult);
  });
}

function getScoreWithTimeCap(score, limit) {
  var finalScore = 0;

  if (score == '0') {
    finalScore = 0;
  } else if (score.indexOf('reps') != -1) {
    finalScore = Number(score.replace(' reps', ''));
  } else {
    var time = score.split(':');
    finalScore = 9999/(Number(time[0] * 60) + Number(time[1])) + limit;
  }

  return finalScore;
}

function getSex(code) {
  if (code == '1' || code == '18')
    return 'm';
  if (code == '2' || code == '13' || code == '19')
    return 'f';
}

function isScale(athlete) {
  var counter = 0;

  athlete.scores.forEach(score => {
    if (score.scoredisplay.indexOf('- s') != -1) {
      counter++;
    }
  });

  return counter > 0;
}

function generateJSON() {
  var attrs = {
    name: 1,
    affiliate: 1,
    overallScore: 1,
    wod1Display: 1,
    wod1Rank: 1,
    wod2Display: 1,
    wod2Rank: 1,
    wod3Display: 1,
    wod3Rank: 1
  };

  Athlete.find({sex: 'm'}, attrs).sort({overallScore: 1}).exec(function(err, athletes) {
    var json = JSON.stringify(athletes);
    fs.writeFile('men_leaderboard.json', json, 'utf-8', function(err) {
      if (err) throw err;
    });
  });

  Athlete.find({sex: 'f'}, attrs).sort({overallScore: 1}).exec(function(err, athletes) {
    var json = JSON.stringify(athletes);
    fs.writeFile('women_leaderboard.json', json, 'utf-8', function(err) {
      if (err) throw err;
    });
  });
}
