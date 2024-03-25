const mongoose = require('mongoose');

// Define the schema for surveys
const surveySchema = new mongoose.Schema({
    title: String, // Title of the survey
    description: String, // Description of the survey
    petName: String, // Name of the pet
    petType: String, // Type of pet (e.g., dog, cat)
    breedSize: String, // Breed size of the pet (e.g., small, medium, large)
    ageRange: String, // Age range of the pet (e.g., puppy, adult, senior)
    activityLevel: String, // Activity level of the pet
    petWeight: Number, // Weight of the pet
    advice: String // Advice provided based on the survey
});

// Create the Survey model
const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
