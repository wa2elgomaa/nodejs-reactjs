let mongoose= require ('mongoose');
let mongooseSchema = mongoose.Schema;

let itemSchema = new mongooseSchema({
    itemName : {type: String , required: true },
    itemDescription : {type: String , required: true },
    qty : {type : Number},
});

module.exports = mongoose.model('Item', itemSchema);
