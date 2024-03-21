const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  title: String,
  description: String,
  petName: String,
  petType: String,
  breedSize: String,
  ageRange: String,
  activityLevel: String,
  petWeight: Number,
  advice: String
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
