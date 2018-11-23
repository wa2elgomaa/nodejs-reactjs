let express = require('express');
let router = express.Router();
let auth = require('../services/authService');

// controller 
let mainController = require('../controllers/mainController');

// login 
router.post('/login', auth.optional, mainController.login);
// login 
router.post('/register', auth.optional, mainController.register);
// logout 
router.get('/logout',auth.optional, mainController.logout);
// get user items 
router.get('/items', auth.optional, mainController.items);


module.exports =router;
