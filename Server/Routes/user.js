const express = require('express');
const router = express.Router();
const {ensureLoggedIn, ensureAdmin} = require("../Middlewares/auth");
const UserController = require('../Controllers/user');

router.get('/users/create', UserController.renderCreateForm)
    .use(ensureAdmin, ensureLoggedIn);

router.get('/users', UserController.getAllUsers)
    .use(ensureAdmin, ensureLoggedIn);

router.get('/users/:id', UserController.getUserById)
    .use(ensureAdmin, ensureLoggedIn);

router.get('/users/edit/:id', UserController.renderEditForm)
    .use(ensureAdmin, ensureLoggedIn);

router.post('/users', UserController.createUser)
    .use(ensureAdmin, ensureLoggedIn);

router.post('/users/:id', UserController.updateUser)
    .use(ensureAdmin, ensureLoggedIn);

router.post('/users/delete/:id', UserController.deleteUser)
    .use(ensureAdmin, ensureLoggedIn);

module.exports = router;
