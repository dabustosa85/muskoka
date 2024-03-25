const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureAdmin } = require('../Middlewares/auth');
const AppointmentController = require('../Controllers/appointment');

// Ensure that the user is logged in and is an admin for all routes in this router
router.use(ensureLoggedIn);
router.use(ensureAdmin);

// Route to render the form for creating appointments
router.get('/appointments/create', AppointmentController.renderCreateForm);

// Route to get all appointments
router.get('/appointments', AppointmentController.getAllAppointments);

// Route to get a specific appointment by ID
router.get('/appointments/:id', AppointmentController.getAppointmentById);

// Route to create a new appointment
router.post('/appointments', AppointmentController.createAppointment);

// Route to delete an appointment by ID
router.post('/appointments/delete/:id', AppointmentController.deleteAppointment);

module.exports = router;
