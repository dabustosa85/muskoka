const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  time: String,
  location: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  survey: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', default: null }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
