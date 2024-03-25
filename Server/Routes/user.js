const express = require('express'); // Importing the express framework
const router = express.Router(); // Creating a router instance to handle user-related routes
const { ensureLoggedIn, ensureAdmin } = require("../Middlewares/auth"); // Importing middleware functions for user authentication
const UserController = require('../Controllers/user'); // Importing the user controller

// Route to render the form for creating a new user
router.get('/users/create', ensureAdmin, ensureLoggedIn, UserController.renderCreateForm);

// Route to fetch all users
router.get('/users', ensureAdmin, ensureLoggedIn, UserController.getAllUsers);

// Route to fetch a user by their ID
router.get('/users/:id', ensureAdmin, ensureLoggedIn, UserController.getUserById);

// Route to render the form for editing a user's information
router.get('/users/edit/:id', ensureAdmin, ensureLoggedIn, UserController.renderEditForm);

// Route to create a new user
router.post('/users', ensureAdmin, ensureLoggedIn, UserController.createUser);

// Route to update an existing user's information
router.post('/users/:id', ensureAdmin, ensureLoggedIn, UserController.updateUser);

// Route to delete a user by their ID
router.post('/users/delete/:id', ensureAdmin, ensureLoggedIn, UserController.deleteUser);

module.exports = router; // Exporting the router to make it available to other parts of the application
