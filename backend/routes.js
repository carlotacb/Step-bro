const express = require('express');
const router = express.Router();

const {UserController} = require('./controllers/userController');
const {AuthController} = require('./controllers/authController')

const userController = UserController();
const authController = AuthController();

// Define routes
router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/users/:email', userController.getUserByEmail);

router.get('/users', userController.getAllUsers);

router.post('/users', userController.createUser);

module.exports = router;
