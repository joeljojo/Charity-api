const express = require('express');
const userControllers = require('../Controllers/userController');

const router = express.Router();

// register route
router.post('/register', userControllers.registerUser);
// login route
router.post('/login', userControllers.userLogin);
module.exports = router;
