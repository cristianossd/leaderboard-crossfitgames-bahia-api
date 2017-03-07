var request = require('request');
var Athlete = require('../models/athlete');
var URL = 'https://games.crossfit.com/competitions/api/v1/competitions/open/2017/leaderboards?affiliate=';

var affiliates = [
  {"id": "5923", "name": "CrossFit Mandacaru", "country": "Brazil", "region": "Latin America", "city": "Salvador", "state": "Bahia"},
  {"id": "7442", "name": "CrossFit Jequie", "country": "Brazil", "region": "Latin America", "city": "Jequi\u00e9", "state": "Bahia"},
  {"id": "8031", "name": "CrossFit Barra", "country": "Brazil", "region": "Latin America", "city": "Salvador", "state": "Bahia"},
  {"id": "10632", "name": "Aldeia CrossFit", "country": "Brazil", "region": "Latin America", "city": "Salvador", "state": "Bahia"},
  {"id": "11246", "name": "Pulsar CrossFit", "country": "Brazil", "region": "Latin America", "city": "Salvador", "state": "Bahia"},
  {"id": "12060", "name": "CrossFit FSA", "country": "Brazil", "region": "Latin America", "city": "Feira de Santana", "state": "Bahia"},
  {"id": "12275", "name": "CrossFit Alcateia", "country": "Brazil", "region": "Latin America", "city": "Salvador", "state": "Bahia"},
  {"id": "13482", "name": "CrossFit SSA", "country": "Brazil", "region": "Latin America", "city": "Salvador", "state": "Bahia"},
  {"id": "13787", "name": "CrossFit Imbui", "country": "Brazil", "region": "Latin America", "city": "Salvador", "state": "Bahia"},
  {"id": "14125", "name": "Pulsar CrossFit", "country": "Brazil", "region": "Latin America", "city": "Salvador", "state": "Bahia"},
  {"id": "15017", "name": "Summer CrossFit", "country": "Brazil", "region": "Latin America", "city": "Salvador", "state": "Bahia"},
  {"id": "16225", "name": "CrossFit Maral", "country": "Brazil", "region": "Latin America", "city": "Salvador", "state": "Bahia"},
  {"id": "16711", "name": "CrossFit OnzeOnze", "country": "Brazil", "region": "Latin America", "city": "Vit\u00f3ria da Conquista", "state": "Bahia"},
  {"id": "16767", "name": "CrossFit Oxente", "country": "Brazil", "region": "Latin America", "city": "salvador", "state": "Bahia"},
  {"id": "16936", "name": "CrossFit Sotero", "country": "Brazil", "region": "Latin America", "city": "Salvador", "state": "Bahia"},
  {"id": "17676", "name": "Garagem 164", "country": "Brazil", "region": "Latin America", "city": "Salvador", "state": "Bahia"},
  {"id": "18390", "name": "CrossFit 7373", "country": "Brazil", "region": "Latin America", "city": "Jequie", "state": "Bahia"},
  {"id": "18677", "name": "Kranos CrossFit", "country": "Brazil", "region": "Latin America", "city": "Lauro de Freitas", "state": "Bahia"},
  {"id": "18910", "name": "CrossFit Itabuna", "country": "Brazil", "region": "Latin America", "city": "Itabuna", "state": "Bahia"}
];

module.exports.syncAthletes = function(req, res, next) {
  affiliates.forEach(affiliate => {
    request(URL + affiliate.id, function(err, response, body) {
      var athletes = JSON.parse(response.body).athletes;

      if (athletes.length > 0) {
        athletes.forEach((athlete) => {
          if (!isScale(athlete))
            createAthlete(athlete, affiliate);
          else
            console.log('Scaled: ' + athlete.name);
        });
      }
    });
  });

  res.sendStatus(200);
};

/* protected */

function createAthlete(athlete, affiliate) {
  var _sex = getSex(athlete.divisionid);

  var _wod1Display = athlete.scores[0].scoredisplay;
  var _wod1Score = getScoreWithTimeCap(athlete.scores[0].scoredisplay, 225);

  var _wod2Display = athlete.scores[1].scoredisplay;
  var _wod2Score = Number(athlete.scores[1].scoredisplay.replace(' reps', ''));

  var newAthlete = new Athlete({
    id: athlete.userid,
    name: athlete.name,
    affiliate: affiliate.name,
    sex: _sex,
    wod1Display: _wod1Display,
    wod1Score: _wod1Score,
    wod2Display: _wod2Display,
    wod2Score: _wod2Score
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
    finalScore = Number(time[0] * 60) + Number(time[1]) + limit;
  }

  return finalScore;
}

function getSex(code) {
  if (code == '1' || code == '18')
    return 'm';
  if (code == '2')
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
