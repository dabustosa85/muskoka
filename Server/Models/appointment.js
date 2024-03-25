const mongoose = require('mongoose');

// Define the schema for appointments
const appointmentSchema = new mongoose.Schema({
    title: String, // Reason of the appointment
    description: String, // Detailed Reason of the appointment
    date: Date, // Date of the appointment
    time: String, // Time of the appointment
    location: String, // Speciality of the appointment
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user associated with the appointment
    survey: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', default: null } // Reference to any associated survey
});

// Create the Appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
