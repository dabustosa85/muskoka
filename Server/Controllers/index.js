const crypto = require('crypto');

const User = require('../Models/user');
const Appointment = require("../Models/appointment");

function DisplayHome(req, res, next) {
    res.render('index', {title: 'Home', page: 'home'});
}

function DisplayBecomeAClient(req, res, next) {
    res.render('become-a-client', {title: 'Become a Client', page: 'become-a-client'});
}

async function DisplayRequestAppointment(req, res, next) {
    const timeSlots = [];
    for (let hour = 9; hour < 18; hour++) {
        ['00', '30'].forEach(minute => {
            const time = `${hour}:${minute}`;
            timeSlots.push(time.length === 4 ? `0${time}` : time); // Asegura formato HH:MM
        });
    }

    if (req.method === 'GET') {
        return res.render('request-appointment', {
            title: 'Request Appointment',
            page: 'request-appointment',
            error: req.query.error,
            timeSlots: timeSlots
        });
    } else if (req.method === 'POST') {
        console.log(req.body);
        try {
            const {firstName, lastName, email, petName, petType, location, appointmentDate, appointmentTime} = req.body;

            // Verificar si el usuario ya existe
            let user = await User.findOne({email: email});

            // Si el usuario no existe, crear uno nuevo
            if (!user) {
                user = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    isAdmin: false // Opcional: Puedes establecer el valor de isAdmin según tus requisitos
                });
                await user.save();
            }

            // Crear la cita asociada al usuario
            const appointment = new Appointment({
                title: 'Appointment', // Puedes ajustar este título según sea necesario
                user: user._id,
                petName: petName,
                petType: petType,
                location: location,
                date: appointmentDate,
                time: appointmentTime
            });
            await appointment.save();

            // Redirigir al usuario a una página de éxito o a otra ubicación
            return res.render('request-appointment', {
                title: 'Request Appointment',
                page: 'request-appointment',
                success: 'Appointment request submitted successfully.',
                timeSlots: timeSlots
            });
        } catch (error) {
            console.error(error);
            return res.render('request-appointment', {
                title: 'Request Appointment',
                page: 'request-appointment',
                error: 'Error processing appointment request. Please try again.',
                timeSlots: timeSlots
            });
        }
    }
}

function DisplaySurvey(req, res, next) {
    res.render('survey', {title: 'Survey', page: 'survey'});
}

function DisplayBackendHome(req, res, next) {
    res.render('backend/index', {title: 'Home', page: 'home'});
}

async function DisplayBackendLogin(req, res) {
    if (req.method === 'GET') {
        res.render('backend/login', {error: req.query.error});
    } else if (req.method === 'POST') {
        try {
            const {email, password} = req.body;
            const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

            const user = await User.findOne({email: email}).exec();

            if (!user) {
                return res.render('backend/login', {error: 'Email not found.'});
            }

            if (hashedPassword === user.password) {
                req.session.user = user;
                return res.redirect('/backend');
            } else {
                return res.render('backend/login', {error: 'Invalid email or password.'});
            }
        } catch (err) {
            console.error(err);
            return res.render('backend/login', {error: 'An error occurred.'});
        }
    }
}

module.exports = {
    DisplayHome: DisplayHome,
    DisplayBecomeAClient: DisplayBecomeAClient,
    DisplayRequestAppointment: DisplayRequestAppointment,
    DisplaySurvey: DisplaySurvey,
    DisplayBackendHome: DisplayBackendHome,
    DisplayBackendLogin: DisplayBackendLogin
}

  