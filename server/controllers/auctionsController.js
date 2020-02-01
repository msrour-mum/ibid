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

const recordLimit = 10;


var find = async function(req, res, next)
{
    try{

        let page = req.query.page || 0;
       
        await Auction.createIndexes();
        var result = await Auction.find({})
        .sort('-creation_date')
        .limit(recordLimit)
        .skip(recordLimit*page)
        .select(select)
        .exec();

     
         res.send(result);
         res.end();
       // return res.status(200,result).end();
        
    }catch(err)
    {
        console.log(err.message);
       // return res.error(500,1000,err.message);
    }
}

var findOne = async function(req, res, next)
{
    try{
       
        await Auction.createIndexes();
        var result =  await Auction.findById(req.params.id);

       
        res.send(result);
        res.end();
       // return res.status(200,result).end();
    }catch(err)
    {
        return res.error(500,1000,err.message);
    }
   
}

var save = async function(req, res,next)
{
    try{
        const auction = new Auction(req.body);
        var result =  await auction.save();  
          
      
        res.send(result);
        res.end();
       // return res.status(200,result).end();
    }catch(err)
    {
        return res.error(500,1000,err.message);
    }
}


var search = async function(req, res, next)
{
    try{  
       
        await Auction.createIndexes();
        let page = req.query.page || 0;
      
        var result = await Auction.find(({text: {search: req.query.q}}))
        .limit(recordLimit)
        .skip(recordLimit*page)
        .select(select)
        .exec();

        console.log(res.result);

       
        res.send(result);
        res.end();
       // return res.status(200,result).end();

    }catch(err)
    {
        return res.error(500,1000,err.message);
    }
}
    
module.exports = {
    find,
    findOne,
    save,
    search
};