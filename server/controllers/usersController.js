// Services
let usersService = require("../services/usersService");

// place new order
exports.placeOrder = function(req, res) {
  usersService.placeOrder(req,res);
};
// list user orders 
exports.myOrders = function(req, res){
  usersService.myOrders(req,res);
}
// confirm order
exports.confirmOrder = function(req, res){
  usersService.confirmOrder(req,res);
}
