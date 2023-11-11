const express = require('express');
const router = express.Router();

const { Pool } = require('pg');

const {UserController} = require('./controllers/userController');
const {AuthController} = require('./controllers/authController')

const userController = UserController();
const authController = AuthController();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};

// Define routes
// router.post('/login', AuthController.login);
// router.post('/register', AuthController.register);

// router.get('/users/:id', UserController.getUserById);

router.get('/users', userController.getAllUsers);


// register user  route with email, username, password, phone, bio and icon
// router.post('/users', UserController.createUser);

module.exports = router;
