//Modules
let jwt = require("jsonwebtoken");

// Models
let User = require("../models/users");
let Order = require("../models/orders");
let Item = require("../models/items");
// entities 
let Response = require("../entities/response");

// mail service
const mailingService = require("./mailingService");
const auth = require("./authService");

exports.placeOrder = function (req, res) {

  const user = auth.parseJWT(auth.getTokenFromHeaders(req));
  if(!user){
    return res.json(Response(false, "Not authorized to use this feature"));
  }
  const { payload: { id } } = user;

  let itemId = req.params.id;
  console.log("items : " , itemId);
  User.findOne({ _id: id }, (err, user)=> {
    if (err) {
      console.log("Failed to save order , please try again");
    } else if (user) {
      // saving order
      Order.findOneAndUpdate({itemId : itemId ,userId : user._id } , {$inc: { qty: 1 }}, { new: true , upsert : true } , (err , order) => {
        if (err) {
          console.log("Failed to save order , please try again");
        } else {
          // saving the mail 
          console.log("sending email ....");
          user.accessToken = jwt.sign({ data: user.email }, "secret", { expiresIn: 24 * 60 * 60 })
          let confirmationURL = req.protocol + "://" + req.get("host") + "/api/confirm?token=" + user.accessToken + "&id=" + order._id;
          // Send confirmation email to the user
          var mail = {
            from: "no-reply@gmail.com",
            to: user.email,
            subject: "Confirm your order",
            text: "Order action required ",
            html: "<a target=_blank href='"+ confirmationURL +"'>Confirm order now</a>"
        }
          mailingService.send(mail , (err,  mailResponse)=>{
            if(err){
              console.log("Failed to send mail with err : " ,err);
            }
            // save user token 
            user.save((err)=>{
              if(err){
                console.log( "Failed to save user token");
              }
              res.json(Response(true, "Order has been saved"));
            });
            
          });
        }
      });
    } else {
      console.log("User not exists");
    }
  });
};

exports.myOrders = function (req, res) {
  const user = auth.parseJWT(auth.getTokenFromHeaders(req));
  if(!user){
    return res.json(Response(false, "Not authorized to use this feature"));
  }
  const { payload: { id } } = user;
  Order.find({ userId: id }, (err, orders) => {
    if (err) {
      res.json(Response(false, "Retrieving orders error"));
    } else {
      let itemsIds = orders.map((order)=> {return order.itemId});
      Item.find({_id : {$in : itemsIds } } , (err, items)=>{
        if(err){
          res.json(Response(false, "Getting orders failed"));
        }else {
          // append confirmed status to item 
          items = items.map((item)=>{
              let newItem = {};
              newItem.itemName = item.itemName;
              newItem.itemDescription = item.itemDescription;
              orders.map((order) => {
                  if(item._id == order.itemId){
                    newItem.id = order._id;
                    newItem.itemId = order.itemId;
                    newItem.qty = order.qty;
                    newItem.confirmed = order.confirmed;
                    newItem.created = order.created;
                  }
              });
              return newItem;
          });
          res.json(Response(true, "Getting orders done", items));
        }
      });
    }
  })
}

exports.confirmOrder = function (req, res) {
  const {query : {token}} = req;
  console.log( "token : " ,token);
  User.findOne({ accessToken: token }, (err, user) => {
    if(err){
      console.log("Error confirming : " , err);
      res.redirect("http://localhost:3000");
    }else if (!user) {
      console.log("User is not exists !");
      res.redirect("http://localhost:3000");
    } else {
      Order.findOne({ _id : req.query.id },  (err, order)=> {
        if (err) {
          console.log("getting error : " , err);
          res.redirect("http://localhost:3000");
        } else if(order) {
          order.confirmed = true;
          order.save((err)=> {
            if (err) {
              console.log("Saving order failed");
              res.redirect("http://localhost:3000");
            } else {
              console.log("Order has been confirmed");
              res.redirect("http://localhost:3000");
            }
          });
        }else {
          res.json({done : "Order not found"});
        }
      });
    }
  })
}