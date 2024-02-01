const express = require('express');
const authRoutes = express.Router();
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');

authRoutes.post('/login', loginController);
authRoutes.post('/register', registerController);

module.exports = authRoutes;
