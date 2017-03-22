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
  wod1TieBreak: Number,
  wod1IsScale: Boolean,
  wod2Display: String,
  wod2Score: Number,
  wod2Rank: Number,
  wod2TieBreak: Number,
  wod2IsScale: Boolean,
  wod3Display: String,
  wod3Score: Number,
  wod3Rank: Number,
  wod3TieBreak: Number,
  wod3IsScale: Boolean,
  wod4Display: String,
  wod4Score: Number,
  wod4Rank: Number,
  wod4TieBreak: Number,
  wod4IsScale: Boolean,
  wod5Display: String,
  wod5Score: Number,
  wod5Rank: Number,
  wod5TieBreak: Number,
  wod5IsScale: Boolean
});

AthleteSchema.plugin(findOrCreate);

module.exports = mongoose.model('Athlete', AthleteSchema);
