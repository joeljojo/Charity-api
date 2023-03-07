const express = require('express');
const userControllers = require('../Controllers/userController');
const mpesaControllers = require('../Controllers/lipanampesaController');

const router = express.Router();

// register route
router.post('/register', userControllers.registerUser);
// login route
router.post('/login', userControllers.userLogin);
// make request route
router.post('/children-home-request', userControllers.makeRequest);
// // fetch admin requests
router.get('/admin-requests', userControllers.adminRequests);
// get donors route
router.get('/donors', userControllers.getDonors);
// get requests route
router.get('/children-home-requests', userControllers.myAllRequests);
// get admin Approved Requests
router.get('/admin-approved-requests', userControllers.myAdminApprovedRequests);
// get admin Rejected Requests
router.get('/admin-rejected-requests', userControllers.myAdminRejectedRequests);
// get donor Approved Requests
router.get('/donor-approved-requests', userControllers.myDonorApprovedRequests);
// get donor Approved Requests
router.get('/donor-rejected-requests', userControllers.myDonorRejectedRequests);
// get donor requests
router.get('/donor-requests', userControllers.donorRequests);
// Admin approves requests route
router.put('/admin-approve-request', userControllers.adminApprovesRequest);
// Admin rejects request routes
router.put('/admin-reject-request', userControllers.adminRejectsRequest);
// Donor rejects request routes
router.put('/donor-approve-request', userControllers.donorApprovesRequest);
// Donor rejects request routes
router.put('/donor-reject-request', userControllers.donorRejectsRequest);

// MPESA ROUTES
// authenticationToken Route
router.get('/authentication-token', mpesaControllers.authenticationToken);
// lipa-na-mpesa route
router.post(
  '/lipa-na-mpesa',
  mpesaControllers.authenticationToken,
  mpesaControllers.onlineLipaNaMpesa
);

// callback route
router.post('/lipa-na-mpesa-callback', mpesaControllers.lipaNaMpesaCallback);
module.exports = router;
