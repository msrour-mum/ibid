var mongoose = require('mongoose');
var schedule = require('node-schedule');
var {of} = require('rxjs');
var {max } = require('rxjs/operators');


//create schema
var auctionSchema = mongoose.Schema({
    user: {name: String, email:String, photoUrl:String},
    title:{
        type: String,
        required: [true, "can't be blank"]
      },
    description:{
        type: String,
        required: [true, "can't be blank"]
      },
    expiry_date:Date,
    init_price:{type:Number, default:0},
    bid_price : {type:Number, default:0},
    bids:{type:[{user: {name: String, email:String, photoUrl:String}, creation_date:Date, price: Number}],default:[]},  
    comments:[{user:{name: String, email:String, photoUrl:String}, creation_date:{type:Date,default:Date.now}, comment_text:String}],  
    likes: [{user:{name: String, email:String, photoUrl:String}, is_like: Boolean}],
    count_bids: {type:Number, default:0},
    count_comments: {type:Number, default:0},
    count_like: {type:Number, default:0},
    count_dislike:{type:Number, default:0},
    status: { type: String, default: 'Initiated' }, //Initiated | Open | Sold | Expired'
    location:[Number],
    winner:{name: String, email:String, photoUrl:String},
    photosUrl:[String] 
},
{timestamps: { 
    createdAt: 'creation_date',
    updatedAt: 'modification_date'
}},
{ autoIndex: false });

auctionSchema.index({title: 'text', description: 'text'});
auctionSchema.index({'user.email': 1});


auctionSchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

auctionSchema.post('save', async function(auction) {
  try{
  
  if(this.wasNew)  // check is new record 
  {
      schedule.scheduleJob(this.expiry_date, async function(_id,_Auction){
     
      let auction = await _Auction.findById(_id);

      let winnerBid;
      if(auction.bids != null && auction.bids.length > 0)
       winnerBid = of(auction.bids).pipe(
        max(bid => bid.price)
      );

      if(!(typeof winnerBid === 'undefined'))
      {
        auction.winner = winnerBid.user;
        auction.status = "Sold";
      }
      else
      {
        auction.status = "Expired";
      }
      
     await auction.save();
    }.bind(null,
      this.id,
       mongoose.model('Auction', auctionSchema)));
    }
    }catch(err)
    {
      console.log('error in preparing scheduler', err);
    }
});

module.exports =  mongoose.model('Auction', auctionSchema);
