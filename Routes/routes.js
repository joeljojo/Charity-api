const express = require('express');
const userControllers = require('../Controllers/userController');

const router = express.Router();

// register route
router.post('/register', userControllers.registerUser);
// login route
router.post('/login', userControllers.userLogin);
// make request route
router.post('/children-home-request', userControllers.makeRequest);
// // fetch admin requests
// router.get('/admin-requests', userControllers.adminRequests);
// get donors route
router.get('/donors', userControllers.getDonors);
module.exports = router;
