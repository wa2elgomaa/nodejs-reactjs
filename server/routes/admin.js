
let express = require("express");
let router = express.Router();

// controllers
let adminController = require('../controllers/adminController');

// services
let auth = require('../services/authService');

// getting all users with orders  
router.post('/users', auth.required , adminController.users);

module.exports = router;
