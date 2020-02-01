
var mongoose = require('mongoose');

//create schema
var auctionSchema = mongoose.Schema({
    user: {name: String, email:String},
    title:{
        type: String,
        required: true
      },
    description:{
        type: String,
        required: true
      },
    creation_date:{type:Date, default:()=>Date.now()},
    expiry_date:Date,
    init_price:{type:Number, default:0},
    bid_price : {type:Number, default:0},
    bids:[{user: {name: String, email:String}, creation_date:Date, price: Number}],  
    comments:[{user:{name: String, email:String}, creation_date:Date, comment_text:String}],  
    likes: [{user:{name: String, email:String}, is_like: Boolean}],
    count_bids: {type:Number, default:0},
    count_comments: {type:Number, default:0},
    count_like: {type:Number, default:0},
    count_dislike:{type:Number, default:0},
    status: { type: String, default: 'Initiated' }, //Initiated | Open | Solid | Expired'
    winner:{name: String, email:String},
    photosUrl:[String] 
},
{ autoIndex: false });

auctionSchema.index({title: 'text', description: 'text'});
auctionSchema.index({'user.email': 1});

module.exports = mongoose.model('Auction', auctionSchema);
