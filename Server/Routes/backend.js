const express = require('express');
const IndexController = require("../Controllers");
const router = express.Router();
const { ensureLoggedIn, ensureAdmin } = require('../middlewares/auth');

const appointmentsRoutes = require('./appointment');
const usersRoutes = require('./user');
const UserController = require("../Controllers/user");

// Route to handle user registration
router.post('/register', (req, res) => {
    UserController.registerUser(req, res);
});

// Route to display backend login page
router.get('/login', (req, res, next) => {
    IndexController.DisplayBackendLogin(req, res, next);
});

// Route to handle backend login form submission
router.post('/login', (req, res, next) => {
    IndexController.DisplayBackendLogin(req, res, next);
});

// Use appointment routes
router.use('/', appointmentsRoutes);

// Use user routes
router.use('/', usersRoutes);

// Route to display backend home page (requires login and admin privileges)
router.get('/', ensureLoggedIn, ensureAdmin, (req, res, next) => {
    IndexController.DisplayBackendHome(req, res, next);
});

module.exports = router;
