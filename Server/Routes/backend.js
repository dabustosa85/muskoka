const express = require('express');
const IndexController = require("../Controllers");
const router = express.Router();

const appointmentsRoutes = require('./appointment');
const usersRoutes = require('./user');

router.get('/', (req, res, next) => {
    IndexController.DisplayBackendHome(req, res, next);
});

router.use('/', appointmentsRoutes);
router.use('/', usersRoutes);

module.exports = router;