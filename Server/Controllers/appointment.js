const Appointment = require('../Models/appointment');
const User = require('../Models/user'); // Asegúrate de importar el modelo User

// Obtener todas las citas
const getAllAppointments = async (req, res) => {
    try {
        const hasUsers = await User.where('isAdmin').equals(false).countDocuments();
        const appointments = await Appointment.find().populate('user', 'firstName lastName');
        res.render('backend/appointment/allAppointments', {appointments, hasUsers});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
};

// Obtener una cita por su ID
const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('user', 'firstName lastName');
        if (!appointment) {
            return res.status(404).json({message: 'Appointment not found'});
        }
        res.render('backend/appointment/appointmentDetail', {appointment});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
};

// Renderizar el formulario de creación de citas
const renderCreateForm = async (req, res) => {
    try {
        // Obtener usuarios no administradores para el dropdown
        const users = await User.find({isAdmin: false}).select('firstName lastName');

        // Generar intervalos de tiempo
        const timeSlots = [];
        for (let hour = 9; hour < 18; hour++) {
            ['00', '30'].forEach(minute => {
                const time = `${hour}:${minute}`;
                timeSlots.push(time.length === 4 ? `0${time}` : time); // Asegura formato HH:MM
            });
        }

        res.render('backend/appointment/createAppointmentForm', {users, timeSlots});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
};

// Crear una nueva cita
const createAppointment = async (req, res) => {
    const {title, description, date, time, location, user} = req.body;
    const newAppointment = new Appointment({
        title,
        description,
        date,
        time,
        location,
        user,
    });

    try {
        await newAppointment.save();
        res.redirect('/backend/appointments');
    } catch (err) {
        console.error(err);
        res.status(400).json({message: err.message});
    }
};

// Eliminar una cita
const deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.redirect('/backend/appointments');
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getAllAppointments,
    getAppointmentById,
    renderCreateForm,
    createAppointment,
    deleteAppointment,
};
