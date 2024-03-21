const User = require('../Models/user');

function DisplayHome(req, res, next) {
    res.render('index', {title: 'Home', page: 'home'});
}

function DisplayBecomeAClient(req, res, next) {
    res.render('become-a-client', {title: 'Become a Client', page: 'become-a-client'});
}

function DisplayRequestAppointment(req, res, next) {
    res.render('request-appointment', {title: 'Request Appointment', page: 'request-appointment'});
}

function DisplaySurvey(req, res, next) {
    res.render('survey', {title: 'Survey', page: 'survey'});
}

function DisplayBackendHome(req, res, next) {
    res.render('backend/index', {title: 'Home', page: 'home'});
}

module.exports = {
    DisplayHome: DisplayHome,
    DisplayBecomeAClient: DisplayBecomeAClient,
    DisplayRequestAppointment: DisplayRequestAppointment,
    DisplaySurvey: DisplaySurvey,
    DisplayBackendHome: DisplayBackendHome
}

  