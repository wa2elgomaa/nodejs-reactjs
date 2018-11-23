
// Models
let Order = require("../models/orders");
let User = require("../models/users");
let Items = require("../models/items");
// entities 
let Response = require("../entities/response");

// services 
const auth = require("../services/authService");

exports.users = (req,res) => {
    const user = auth.parseJWT(auth.getTokenFromHeaders(req));
    const { payload: { isAdmin } } = user;

    if(!user || !isAdmin){
        // return if the user not admin 
        return res.json(Response(false , "You don't have the access to view this data"));
    }
    User.find({},(err,users)=>{
        if(err){
            return  res.json(Response(false , "Failed to retrieve users"));
        }else {
            let usersIds = users.map((user)=> {return user._id});
            Order.find({userId : {$in : usersIds } } , (err, orders)=>{
                if(err){
                  res.json(Response(false, "Getting user orders failed"));
                }else {
                    let itemsIds = orders.map((order)=> {return order.itemId});

                    Items.find({_id : {$in : itemsIds }}  ,(err , items)=>{
                        if(err){
                            return res.json(Response(false, "Getting items failed"));
                        }else {
                            // merge item & order details for the founded users  
                            // eleminating unwanted data from both user & order 
                            users = users.map((user)=>{
                                let newUser = {};
                                newUser.id = user._id;
                                newUser.name = user.email;
                                orders.map((order) => {
                                    if(order.userId == user._id){
                                        items.map((item)=>{
                                            if(order.itemId == item._id ){
                                                let orderDetails = {};
                                                orderDetails.id = order._id;
                                                orderDetails.qty = order.qty;
                                                orderDetails.itemName = item.itemName;
                                                orderDetails.itemDescription = item.itemDescription;
                                                if(!newUser.orders)
                                                    newUser.orders  = [];
        
                                                newUser.orders.push(orderDetails);
                                            }
                                        });
                                    }
                                   
                                });
                                return newUser;
                            });
                            res.json(Response(true, "Getting orders done", users));
                        }
                    });
                }
            });
        }
    })
}
