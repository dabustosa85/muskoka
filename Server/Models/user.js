const mongoose = require('mongoose');

// Define the schema for users
const userSchema = new mongoose.Schema({
    firstName: String, // First name of the user
    lastName: String, // Last name of the user
    email: {type: String, unique: true}, // Email of the user (unique constraint)
    password: String, // Password of the user
    isAdmin: {type: Boolean, default: false}, // Whether the user is an admin or not (default: false)
    petType: String, // Type of pet associated with the user
    petName: String, // Name of the pet associated with the user
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
