var Auction = require('../models/auctions');

 //Projected fields
const select = `user 
title 
description 
creation_date 
expiry_date 
init_price 
bid_price 
count_bids 
count_comments 
count_like 
count_dislike,
status 
winner 
photosUrl`;

let recordLimit = 10;


var find = async function(req, res, next)
{
    try{

        let page = req.query._page || 0;
        recordLimit = req.query._limit || recordLimit;
        
        page = parseInt(page);
        recordLimit = parseInt(recordLimit);

        await Auction.createIndexes();
        var result = await Auction.find({})
        .sort('-creation_date')
         .limit(recordLimit)
         .skip(recordLimit*page)
        .select(select)
        .exec();

     
        res.result(200,result);
        
    }catch(err)
    {
       return res.error(500,1000,err.message);
    }
}

var findOne = async function(req, res, next)
{
    try{
       
        await Auction.createIndexes();
        var result =  await Auction.findById(req.params.id);


        res.result(200,result);
        
    }catch(err)
    {
       return res.error(500,1000,err.message);
    }
   
}

var findUserAuction = async function(req, res, next)
{
    try{

        await Auction.createIndexes();
        var result =  await Auction.find({'user.email':req.params.email});
        res.result(200,result);

    }catch(err)
    {
        return res.error(500,1000,err.message);
    }

}

var save = async function(req, res,next)
{
    try{
        let payload = JSON.parse(req.body.payload);

        const auction = new Auction(payload);
        auction.photosUrl.push(`pictures/${req.file.filename}`);
        console.log("save : ",auction)
        var result =  await auction.save();  

      
        res.result(200,result);
        
    }catch(err)
    {
       return res.error(500,1000,err.message);
    }
}

var addBid = async function(req, res,next)
{
    try{
        //const auction = new Auction(req.body);
        console.log('req.body',req.body)
        let auction =  await Auction.findById(req.params.id);
        console.log('auction',auction)
        auction.bids.push(req.body);
        auction.bid_price=req.body.price;
        var result =  await auction.save();

        res.result(200,result);
        
    }catch(err)
    {
       return res.error(500,1000,err.message);
    }
}

var like = async function(req, res,next)
{
    try{
        var auction =  await Auction.findById(req.params.id);
        let found = auction.likes.find(element => element.user.email == req.body.user.email);
        if (found) //remove
        {
            const index = auction.likes.indexOf(found);
            if (index >= 0) auction.likes.splice(index, 1);
            if(found.is_like!=req.body.is_like){//if is like not equal push again
                auction.likes.push(req.body);
            }
        }
        else
            auction.likes.push(req.body);
        auction.count_like =auction.likes.filter(x=>x.is_like==true).length|0;
        auction.count_dislike =auction.likes.length-auction.count_like;
        var result =  await auction.save();
        
        res.result(200,result);
        
    }catch(err)
    {
       return res.error(500,1000,err.message);
    }
}


var search = async function(req, res, next)
{
    try{  
       
        await Auction.createIndexes();
        let page = req.query._page || 0;
        recordLimit = req.query._limit || recordLimit;
        
        page = parseInt(page);
        recordLimit = parseInt(recordLimit);
        
      console.log('q', req.query.q)
     //   console.log('q',q)
     //    var result = await Auction.find(({text: {search: req.query.q}}))
     //    //.limit(recordLimit)
     //    //.skip(recordLimit*0)
     //    //.select(select)
     //    .exec();

        var result = Auction.find({$text: {$search: req.query.q}})
            // .skip(recordLimit*page)
            // .limit(recordLimit)
        //    .exec();

        console.log(res.result);

       
        res.result(200,result);
        
    }catch(err)
    {
        console.log(err);

        return res.error(500,1000,err.message);
    }
}
    
module.exports = {
    find,
    findOne,
    save,
    search ,
    addBid ,
    like ,
    findUserAuction
};
