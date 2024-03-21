const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    password: String,
    isAdmin: {type: Boolean, default: false},
    petType: String,
    petName: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;