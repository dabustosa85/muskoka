const express = require('express');
const router = express.Router();

// import the index controller
const IndexController = require('../Controllers/index');

/* GET Default Route */
router.get('/', (req, res, next)=>
{
    IndexController.DisplayHome(req, res, next);
});

/* GET Home Page */
router.get('/home', (req, res, next)=>
{
    IndexController.DisplayHome(req, res, next);
});

/* GET Become a Client Page */
router.get('/become-a-client', (req, res, next)=>
{
    IndexController.DisplayBecomeAClient(req, res, next);
});

/* GET Request Appointment Page */
router.get('/request-appointment', (req, res, next)=>
{
    IndexController.DisplayRequestAppointment(req, res, next);
});

module.exports = router;
