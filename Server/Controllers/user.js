const crypto = require('crypto');

const User = require('../Models/user');

/**
 * Retrieves all users and renders the page displaying them.
 */
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        console.log(users)
        res.render('backend/user/allUsers', {title: 'Users', users: users, page: 'users'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

/**
 * Retrieves a user by their ID and renders the user detail page.
 */
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({message: 'User not found'});
        }
        res.render('backend/user/userDetail', {user: user});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

/**
 * Renders the form for creating a new user.
 */
const renderCreateForm = (req, res, next) => {
    res.render('backend/user/createUserForm');
};

/**
 * Renders the form for editing an existing user.
 */
const renderEditForm = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('backend/user/editUserForm', {user});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching user');
    }
};

/**
 * Creates a new user based on the provided data.
 */
const createUser = async (req, res, next) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: crypto.createHash('md5').update(req.body.password).digest('hex'),
        isAdmin: req.body.isAdmin === 'on',
        petType: req.body.petType,
        petName: req.body.petName
    };

    const user = new User(userData);

    try {
        const newUser = await user.save();
        res.redirect('/backend/users');
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

/**
 * Updates an existing user based on the provided data.
 */
const updateUser = async (req, res, next) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        ...(req.body.password && {
            password: crypto.createHash('md5').update(req.body.password).digest('hex'),
        }),
        isAdmin: req.body.isAdmin === 'on',
        petType: req.body.petType,
        petName: req.body.petName
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, userData, {new: true, runValidators: true});
        res.redirect('/backend/users');
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

/**
 * Deletes a user by their ID.
 */
const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/backend/users');
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

/**
 * Registers a new user based on the provided data.
 */
const registerUser = async (req, res) => {
    console.log(req.body);
    try {

        const {firstName, lastName, email, password, petType, petName} = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.render('become-a-client', {
                error: 'Please fill in all required fields.',
                title: 'Become a Client',
                page: 'become-a-client'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.render('become-a-client', {
                error: 'Please enter a valid email address.',
                title: 'Become a Client',
                page: 'become-a-client'
            });
        }

        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            return res.render('become-a-client', {
                error: 'Email already exists',
                title: 'Become a Client',
                page: 'become-a-client'
            });
        }

        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            petType,
            petName,
            isAdmin: false
        });

        await newUser.save();
        return res.render('become-a-client', {
            success: 'User registered successfully',
            title: 'Become a Client',
            page: 'become-a-client'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error registering new user'});
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    renderCreateForm,
    renderEditForm,
    createUser,
    updateUser,
    deleteUser,
    registerUser
};
