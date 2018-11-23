
let mongoose= require ('mongoose');
let mongooseSchema = mongoose.Schema;

let orderShcema = new mongooseSchema({
    userId:  {type: String , required : true },
    itemId:  {type: String , required : true},
    qty : {type : Number , default: 1},
    confirmed:  {type: Boolean },
    created:  {type : Date, default: Date.now},
});

module.exports = mongoose.model('Order', orderShcema);
