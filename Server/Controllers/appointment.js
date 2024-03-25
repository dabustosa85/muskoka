const Appointment = require('../Models/appointment');
const User = require('../Models/user'); // Ensure to import the User model

// Retrieve all appointments
const getAllAppointments = async (req, res) => {
    try {
        // Check if there are any non-admin users
        const hasUsers = await User.where('isAdmin').equals(false).countDocuments();

        // Find all appointments and populate the associated user information
        const appointments = await Appointment.find().populate('user', 'firstName lastName');

        // Render the view with appointment data and user information
        res.render('backend/appointment/allAppointments', { appointments, hasUsers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// Retrieve an appointment by its ID
const getAppointmentById = async (req, res) => {
    try {
        // Find the appointment by its ID and populate the associated user information
        const appointment = await Appointment.findById(req.params.id).populate('user', 'firstName lastName');

        // Check if the appointment exists
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Render the view with appointment details
        res.render('backend/appointment/appointmentDetail', { appointment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// Render the appointment creation form
const renderCreateForm = async (req, res) => {
    try {
        // Find non-admin users for the dropdown
        const users = await User.find({ isAdmin: false }).select('firstName lastName');

        // Generate time slots
        const timeSlots = [];
        for (let hour = 9; hour < 18; hour++) {
            ['00', '30'].forEach(minute => {
                const time = `${hour}:${minute}`;
                timeSlots.push(time.length === 4 ? `0${time}` : time); // Ensure HH:MM format
            });
        }

        // Render the view with users and time slots
        res.render('backend/appointment/createAppointmentForm', { users, timeSlots });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// Create a new appointment
const createAppointment = async (req, res) => {
    const { title, description, date, time, location, user } = req.body;

    // Create a new appointment object
    const newAppointment = new Appointment({
        title,
        description,
        date,
        time,
        location,
        user,
    });

    try {
        // Save the new appointment to the database
        await newAppointment.save();

        // Redirect to the appointments page
        res.redirect('/backend/appointments');
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
    try {
        // Find and delete the appointment by its ID
        await Appointment.findByIdAndDelete(req.params.id);

        // Redirect to the appointments page
        res.redirect('/backend/appointments');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllAppointments,
    getAppointmentById,
    renderCreateForm,
    createAppointment,
    deleteAppointment,
};
