const express = require('express');
const router = express.Router();

const AppointmentController = require('../Controllers/appointment');

router.get('/appointments/create', AppointmentController.renderCreateForm);

router.get('/appointments', AppointmentController.getAllAppointments);

router.get('/appointments/:id', AppointmentController.getAppointmentById);

router.post('/appointments', AppointmentController.createAppointment);

router.post('/appointments/delete/:id', AppointmentController.deleteAppointment);

module.exports = router;
