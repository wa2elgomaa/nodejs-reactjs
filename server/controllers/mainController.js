
// Services
let mainService = require("../services/mainService");

// load items 
exports.items = (req,res, next)=>{
    mainService.items(req , res, next);
}
// login to user page
exports.login = (req,res , next) => {
    mainService.login(req , res, next);    
}
// register new user 
exports.register = (req,res , next) => {
    mainService.register(req , res, next);    
}
// log out and clear session 
exports.logout = (req,res, next) => {
    mainService.logout(req , res, next);    
}

