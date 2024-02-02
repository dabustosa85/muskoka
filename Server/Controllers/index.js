const User = require('../Models/user');

/**
 * This function will display the home page
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function DisplayHome(req, res, next)
{
  res.render('index', {title: 'Home', page: 'home'});
}

function DisplayBecomeAClient(req, res, next)
{
  res.render('become-a-client', {title: 'Become a Client', page: 'become-a-client'});
}

function DisplayRequestAppointment(req, res, next)
{
  res.render('request-appointment', {title: 'Request Appointment', page: 'request-appointment'});
}

module.exports = {
 DisplayHome: DisplayHome,
 DisplayBecomeAClient: DisplayBecomeAClient,
 DisplayRequestAppointment: DisplayRequestAppointment
}

  