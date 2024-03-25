const express = require('express');
const router = express.Router();
const backendRoutes = require('./backend');

// Import the index controller
const IndexController = require('../Controllers/index');

/* GET Default Route */
router.get('/', IndexController.DisplayHome);

/* GET Home Page */
router.get('/home', IndexController.DisplayHome);

/* GET Become a Client Page */
router.get('/become-a-client', IndexController.DisplayBecomeAClient);

/* GET Request Appointment Page */
router.get('/request-appointment', IndexController.DisplayRequestAppointment);

router.post('/request-appointment', IndexController.DisplayRequestAppointment);

/* GET Survey Page */
router.get('/survey', IndexController.DisplaySurvey);

router.use('/backend', backendRoutes);

module.exports = router;
