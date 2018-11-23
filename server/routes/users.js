let express = require('express');
let router = express.Router();

let Response = require("../entities/response");

// controllers 
let usersController = require('../controllers/usersController');

// services 
let auth = require('../services/authService');

// create user order
router.post('/create/:id',auth.required, usersController.placeOrder);
// get user orders 
router.post('/orders', auth.required, usersController.myOrders);
// confirm user order 
router.get('/confirm', usersController.confirmOrder);

// Authenticate the route
function isAuthenticated(req,res,next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    res.json(Response(false, "You must be logged in to continue" ));
  }
}

module.exports = router;
