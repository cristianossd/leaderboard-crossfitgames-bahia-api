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
          createAthlete(athlete, affiliate);
        });
      }
    });
  });

  res.sendStatus(200);
};

module.exports.createRanking = function(req, res, next) {

  /* Men wod1 */
  createAthleteRank({
    rx: {sex: 'm', wod1IsScale: false, wod1TieBreak: {$ne:null}},
    scale: {sex: 'm', wod1IsScale: true, wod1TieBreak: {$ne:null}},
    not_performed: {sex: 'm', wod1TieBreak: null},
    sort: {wod1Score: -1, wod1TieBreak: 1},
    score: 'wod1Score', tiebreak: 'wod1TieBreak', rank: 'wod1Rank'
  });

  /* Men wod2 */
  createAthleteRank({
    rx: {sex: 'm', wod2IsScale: false, wod2TieBreak: {$ne:null}},
    scale: {sex: 'm', wod2IsScale: true, wod2TieBreak: {$ne:null}},
    not_performed: {sex: 'm', wod2TieBreak: null},
    sort: {wod2Score: -1, wod2TieBreak: 1},
    score: 'wod2Score', tiebreak: 'wod2TieBreak', rank: 'wod2Rank'
  });

  /* Men wod3 */
  createAthleteRank({
    rx: {sex: 'm', wod3IsScale: false, wod3TieBreak: {$ne:null}},
    scale: {sex: 'm', wod3IsScale: true, wod3TieBreak: {$ne:null}},
    not_performed: {sex: 'm', wod3TieBreak: null},
    sort: {wod3Score: -1, wod3TieBreak: 1},
    score: 'wod3Score', tiebreak: 'wod3TieBreak', rank: 'wod3Rank'
  });

  /* Men wod4 */
  createAthleteRank({
    rx: {sex: 'm', wod4IsScale: false, wod4TieBreak: {$ne:null}},
    scale: {sex: 'm', wod4IsScale: true, wod4TieBreak: {$ne:null}},
    not_performed: {sex: 'm', wod4TieBreak: null},
    sort: {wod4Score: -1, wod4TieBreak: 1},
    score: 'wod4Score', tiebreak: 'wod4TieBreak', rank: 'wod4Rank'
  });

  /* Women wod1 */
  createAthleteRank({
    rx: {sex: 'f', wod1IsScale: false, wod1TieBreak: {$ne:null}},
    scale: {sex: 'f', wod1IsScale: true, wod1TieBreak: {$ne:null}},
    not_performed: {sex: 'f', wod1TieBreak: null},
    sort: {wod1Score: -1, wod1TieBreak: 1},
    score: 'wod1Score', tiebreak: 'wod1TieBreak', rank: 'wod1Rank'
  });

  /* Women wod2 */
  createAthleteRank({
    rx: {sex: 'f', wod2IsScale: false, wod2TieBreak: {$ne:null}},
    scale: {sex: 'f', wod2IsScale: true, wod2TieBreak: {$ne:null}},
    not_performed: {sex: 'f', wod2TieBreak: null},
    sort: {wod2Score: -1, wod2TieBreak: 1},
    score: 'wod2Score', tiebreak: 'wod2TieBreak', rank: 'wod2Rank'
  });

  /* Women wod3 */
  createAthleteRank({
    rx: {sex: 'f', wod3IsScale: false, wod3TieBreak: {$ne:null}},
    scale: {sex: 'f', wod3IsScale: true, wod3TieBreak: {$ne:null}},
    not_performed: {sex: 'f', wod3TieBreak: null},
    sort: {wod3Score: -1, wod3TieBreak: 1},
    score: 'wod3Score', tiebreak: 'wod3TieBreak', rank: 'wod3Rank'
  });

  /* Women wod4 */
  createAthleteRank({
    rx: {sex: 'f', wod4IsScale: false, wod4TieBreak: {$ne:null}},
    scale: {sex: 'f', wod4IsScale: true, wod4TieBreak: {$ne:null}},
    not_performed: {sex: 'f', wod4TieBreak: null},
    sort: {wod4Score: -1, wod4TieBreak: 1},
    score: 'wod4Score', tiebreak: 'wod4TieBreak', rank: 'wod4Rank'
  });

  res.sendStatus(200);
};

module.exports.get = function(req, res, next) {
  Athlete.find().exec(function(err, athletes) {
    console.log("Total of athletes to get the overallScore updated: " + athletes.length);

    async.eachSeries(athletes, function(athlete, callback) {
      _overallScore = athlete.wod1Rank + athlete.wod2Rank + athlete.wod3Rank + athlete.wod4Rank;

      if (athlete.wod1Rank == -1 || athlete.wod2Rank == -1 || athlete.wod3Rank == -1 || athlete.wod4Rank == -1) {
        console.log("Athlete with overallScore not updated:");
        console.log(athlete);
      } else {
        Athlete.update({id: athlete.id}, {$set: {overallScore: _overallScore}}, function(err, result) {
          if (err) console.log(err);

          console.log('Overall score updated for ' + athlete.name);
          console.log('score ' + athlete.overallScore);
        });
      }

      callback();
    });
  });

  res.sendStatus(200);
};

module.exports.generate = function(req, res, next) {
  generateJSON();
  res.sendStatus(200);
};

/* protected */

function createAthleteRank(paramObj) {
  var allAthletes = [];

  return getAthletesRX(allAthletes, paramObj);
}

function getAthletesRX(allAthletes, paramObj) {
  Athlete.find(paramObj.rx).sort(paramObj.sort).exec(function (err, athletes) {
    if (err) console.log(err);

    allAthletes = allAthletes.concat(athletes);

    return getAthletesScale(allAthletes, paramObj);
  });
}

function getAthletesScale(allAthletes, paramObj) {
  Athlete.find(paramObj.scale).sort(paramObj.sort).exec(function (err, athletes) {
    if (err) console.log(err);

    allAthletes = allAthletes.concat(athletes);

    return getAthletesNotPerfomed(allAthletes, paramObj);
  });
}

function getAthletesNotPerfomed(allAthletes, paramObj) {
  Athlete.find(paramObj.not_performed).sort(paramObj.sort).exec(function(err, athletes) {
    if (err) console.log(err);

    allAthletes = allAthletes.concat(athletes);

    return saveResults(allAthletes, paramObj);
  });
}

function saveResults(allAthletes, paramObj) {
  var pos = 1, next = 1, prev = 0, prevTieBreak = 0, prevRank = 1;
  async.eachSeries(allAthletes, function(athlete, callback) {
    var newRank = pos;
    var rankObj = {};

    if (athlete[paramObj.score] == prev && athlete[paramObj.tiebreak] == prevTieBreak) {
      newRank = prevRank;
    } else {
      next++;
      prevRank = pos;
      pos = next;
    }

    prev = athlete[paramObj.score];
    prevTieBreak = athlete[paramObj.tiebreak];

    rankObj[paramObj.rank] = newRank;

    Athlete.update({id: athlete.id}, {$set: rankObj}, function(err, result) {
      if (err) console.log(err);

      console.log('Updated rank of ' + athlete.name);
      console.log('New rank: ' + athlete[paramObj.rank]);
      callback();
    });
  });
}

function createAthlete(athlete, affiliate) {

  var _sex = getSex(athlete.divisionid, athlete.userid);

  var _wod1Display = athlete.scores[0].scoredisplay;
  var _wod1Score = getScoreWithTimeCap(_wod1Display, 225);
  var _wod1TieBreak = (athlete.scores[0].scoredetails) ? athlete.scores[0].scoredetails.time : null;
  var _wod1IsScale = Boolean(_wod1Display.indexOf('- s') != -1);

  var _wod2Display = athlete.scores[1].scoredisplay;
  var _wod2Score = Number(_wod2Display.replace(' reps', '').replace(' - s', ''));
  var _wod2TieBreak = (athlete.scores[1].scoredetails) ? athlete.scores[1].scoredetails.time : null;
  var _wod2IsScale = Boolean(_wod2Display.indexOf('- s') != -1);

  var _wod3Display = athlete.scores[2].scoredisplay;
  var _wod3Score = getScoreWithTimeCap(_wod3Display, 216);
  var _wod3TieBreak = (athlete.scores[2].scoredetails) ? athlete.scores[2].scoredetails.time : null;
  var _wod3IsScale = Boolean(_wod3Display.indexOf('- s') != -1);

  var _wod4Display = athlete.scores[3].scoredisplay;
  var _wod4Score = Number(_wod4Display.replace(' reps', '').replace(' - s', ''));
  var _wod4TieBreak = (athlete.scores[3].scoredetails) ? athlete.scores[3].scoredetails.time : null;
  var _wod4IsScale = Boolean(_wod4Display.indexOf('- s') != -1);

  var athleteFields = {
    name: athlete.name, affiliate: affiliate.name, sex: _sex,
    wod1Display: _wod1Display, wod1Score: _wod1Score, wod1TieBreak: _wod1TieBreak, wod1IsScale: _wod1IsScale, wod1Rank: -1,
    wod2Display: _wod2Display, wod2Score: _wod2Score, wod2TieBreak: _wod2TieBreak, wod2IsScale: _wod2IsScale, wod2Rank: -1,
    wod3Display: _wod3Display, wod3Score: _wod3Score, wod3TieBreak: _wod3TieBreak, wod3IsScale: _wod3IsScale, wod3Rank: -1,
    wod4Display: _wod4Display, wod4Score: _wod4Score, wod4TieBreak: _wod4TieBreak, wod4IsScale: _wod4IsScale, wod4Rank: -1
  };

  Athlete.find({id: athlete.userid}).exec(function(err, athletes) {
    if (err) console.log(err);

    if (athletes.length > 0) {
      async.eachSeries(athletes, function(athlete, callback){
        console.log("Athlete already exists: " + athlete.name + "\nUpdating athlete...");

        Athlete.update({id: athlete.id}, {$set: athleteFields}, function(err, result) {
          if (err) console.log(err);

          console.log("Athlete updated with sucess!");

          callback();
        });
      });
    } else {
      console.log("Athlete not exists...\n Saving new athlete...");

      athleteFields.id = athlete.userid;
      var newAthlete = new Athlete(athleteFields);

      newAthlete.save(function(err, athleteResult) {
        if (err) console.log(err);

        console.log("Athlete " + athleteResult.name + " saved with sucess! ");
      });
    }
  });
}

function getScoreWithTimeCap(score, limit) {
  var finalScore = 0;

  if (score.indexOf('- s') != -1) {
    score = score.replace(' - s', '');
  }

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

function getSex(code, id) {
  if (code == '1' || code == '3' || code == '5' || code == '12' || code == '16' || code == '18') {
    return 'm';
  }

  if (code == '2' || code == '4' || code == '13' || code == '19') {
    return 'f';
  }

  console.log('\nCode division ' + code + ' of athlete ' + id + ' not listed!\n');

  return 'Not listed';
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
    wod3Rank: 1,
    wod4Display: 1,
    wod4Rank: 1
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
