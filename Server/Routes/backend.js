const express = require('express');
const IndexController = require("../Controllers");
const router = express.Router();
const { ensureLoggedIn, ensureAdmin } = require('../middlewares/auth');

const appointmentsRoutes = require('./appointment');
const usersRoutes = require('./user');
const UserController = require("../Controllers/user");

router.post('/register', (req, res) => {
    UserController.registerUser(req, res);
});

router.get('/login', (req, res, next) => {
    IndexController.DisplayBackendLogin(req, res, next);
});

router.post('/login', (req, res, next) => {
    IndexController.DisplayBackendLogin(req, res, next);
});

router.use('/', appointmentsRoutes);
router.use('/', usersRoutes);

router.get('/', ensureLoggedIn, ensureAdmin, (req, res, next) => {
    IndexController.DisplayBackendHome(req, res, next);
});

module.exports = router;