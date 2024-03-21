const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/user');

router.get('/users/create', UserController.renderCreateForm);

router.get('/users', UserController.getAllUsers);

router.get('/users/:id', UserController.getUserById);

router.get('/users/edit/:id', UserController.renderEditForm);

router.post('/users', UserController.createUser);

router.post('/users/:id', UserController.updateUser);

router.post('/users/delete/:id', UserController.deleteUser);

module.exports = router;
