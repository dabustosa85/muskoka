const crypto = require('crypto');

const User = require('../Models/user');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        console.log(users)
        res.render('backend/user/allUsers', {users: users});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }
        res.render('backend/user/userDetail', {user: user});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const renderCreateForm = (req, res, next) => {
    res.render('backend/user/createUserForm');
};

const renderEditForm = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('backend/user/editUserForm', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching user');
  }
};


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
    res.status(400).json({ message: err.message });
  }
};

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
    const updatedUser = await User.findByIdAndUpdate(req.params.id, userData, { new: true, runValidators: true });
    res.redirect('/backend/users');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/backend/users');
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    renderCreateForm,
    renderEditForm,
    createUser,
    updateUser,
    deleteUser
};
