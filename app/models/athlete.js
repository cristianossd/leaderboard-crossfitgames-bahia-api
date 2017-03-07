var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;

var AthleteSchema = new Schema({
  id: String,
  name: String,
  affiliate: String,
  sex: String,
  overallScore: Number,
  wod1Display: String,
  wod1Score: Number,
  wod1Rank: Number,
  wod2Display: String,
  wod2Score: Number,
  wod2Rank: Number,
  wod3Display: String,
  wod3Score: Number,
  wod3Rank: Number,
  wod4Display: String,
  wod4Score: Number,
  wod4Rank: Number,
  wod5Display: String,
  wod5Score: Number,
  wod5Rank: Number
});

AthleteSchema.plugin(findOrCreate);

module.exports = mongoose.model('Athlete', AthleteSchema);
