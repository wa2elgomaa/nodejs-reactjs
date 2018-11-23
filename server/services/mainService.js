// passport 
var passport = require("passport");

// Models
let Items = require("../models/items");
let User = require("../models/users");
// entities 
let Response = require("../entities/response");


exports.login = (req,res, next) => {
    const { body: { email , password } } = req;

  if(!email) {
    return res.json(Response(false, "Email is required"));
  }

  if(!password) {
    return res.json(Response(false, "Password is required"));
  }
  return passport.authenticate('local', { session: false }, (err, passportUser) => {

    if(err) {
        console.log("authenticating error : " , err);
        return res.json(err);
    }

    if(passportUser) {
      const user = passportUser;
      return res.json(Response(true, "User logged" , user.toAuthJSON()));
    }

  })(req, res, next);
}

exports.register = (req,res, next) => {
    const { body: { email , password } } = req;

    console.log("registering : " , req.body);
    if(!email) {
      return res.json(Response(false , 'Email is required'));
    }
  
    if(!password) {
        return res.json(Response(false , 'Password is required'));
    }
  
    const user = new User({
        email , password
    });
    user.encryptPassword(password);
  
    user.save((err)=>{
        if(err){
          console.log("register error : " ,err);
          Response(false , "Failed to register")
        }
        res.json( Response(true , "Done", user.toAuthJSON()));
    });
}

exports.logout = (req,res) => {
    req.logout();
    res.json(Response(true , "Logged out"));
}

exports.items = (req , res)=>{
    Items.find({},(err,items)=>{
        if(err){
            res.json(Response(false , "Failed to retrieve items"));
        }else {
            res.json(Response(true , "Items retrieved successfully" , items));
        }
    });
}
