// users.routes.js
const CustomersController = require('../controllers/users.controller');
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const { verifyToken, isAdmin } = require('../verifyToken'); // Import your verifyToken middleware
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
//  Rate limiting for the registration route
const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 100, // start blocking after 10 requests
    message: "Too many accounts created from this IP, please try again after an hour"
});
const tokenRefreshLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 15, // Allow 15 refresh requests per hour per IP
    message: "Too many refresh token requests from this IP, please try again after an hour"
});
router.use(cookieParser())
router.get('/checklogin', CustomersController.checkLogin);


router.post('/login', CustomersController.loginUser);
router.post('/register', registerLimiter, CustomersController.createOne);
router.post('/logout', CustomersController.logoutUser);
router.post('/refresh', tokenRefreshLimiter, CustomersController.refreshToken);
//// Routes below require authentication
//router.use(verifyToken); // Apply verifyToken middleware to routes below
router.get('/', CustomersController.getAll);// verify is admin for this route
router.get('/:id', CustomersController.getOne);
router.put('/:id', CustomersController.updateOne);
router.delete('/:id', CustomersController.deleteOne);
module.exports = router;
