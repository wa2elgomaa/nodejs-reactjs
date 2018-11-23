
// Services
let adminService = require("../services/adminService");

exports.users = (req,res) => {
    adminService.users(req , res);    
}


