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


var find = async function (req, res, next) {
    try {

        let page = req.query._page || 0;
        recordLimit = req.query._limit || recordLimit;

        page = parseInt(page);
        recordLimit = parseInt(recordLimit);

        await Auction.createIndexes();
        var result = await Auction.find({})
            .sort('-creation_date')
            .limit(recordLimit)
            .skip(recordLimit * page)
            .select(select)
            .exec();


        res.result(200, result);

    } catch (err) {
        return res.error(500, 1000, err.message);
    }
}


var findInfiniteScroll = async function (req, res, next) {
    try {

        let page = req.query._page || 1;
        recordLimit = req.query._limit || recordLimit;

        page = parseInt(page);
        recordLimit = parseInt(recordLimit);

        await Auction.createIndexes();


        console.log('Before findInfiniteScroll:');
        var result = await Auction.paginate({status : req.query.status}, 
            { 
                page: page, 
                limit: recordLimit,
                sort:'-creation_date',
                select:select
             });
            
          

        res.result(200, result);

    } catch (err) {
        
        return res.error(500, 1000, err.message);
    }
}

var findOne = async function (req, res, next) {
    try {

        await Auction.createIndexes();
        var result = await Auction.findById(req.params.id);


        res.result(200, result);

    } catch (err) {
        return res.error(500, 1000, err.message);
    }

}

var findUserAuction = async function (req, res, next) {
    try {

        await Auction.createIndexes();
        var result = await Auction.find({'user._id': req.params.id});
        res.result(200, result);

    } catch (err) {
        return res.error(500, 1000, err.message);
    }

}

var save = async function (req, res, next) {
    try {
        let payload = JSON.parse(req.body.payload);

        const auction = new Auction(payload);
        auction.photosUrl.push(`pictures/${req.file.filename}`);
        auction.count_bids = auction.likes.length | 0;
        var result = await auction.save();


        res.result(200, result);

    } catch (err) {
        return res.error(500, 1000, err.message);
    }
}

var addBid = async function (req, res, next) {
    try {
        let auction = await Auction.findById(req.params.id);
        auction.bids.push(req.body);
        auction.bid_price = req.body.price;
        var result = await auction.save();
        res.result(200, result);

    } catch (err) {
        return res.error(500, 1000, err.message);
    }
}

var like = async function (req, res, next) {
    try {
        var auction = await Auction.findById(req.params.id);
        let found = auction.likes.find(element => element.user.email == req.body.user.email);
        if (found) //remove
        {
            const index = auction.likes.indexOf(found);
            if (index >= 0) auction.likes.splice(index, 1);
            if (found.is_like != req.body.is_like) {//if is like not equal push again
                auction.likes.push(req.body);
            }
        } else
            auction.likes.push(req.body);
        auction.count_like = auction.likes.filter(x => x.is_like == true).length | 0;
        auction.count_dislike = auction.likes.length - auction.count_like;
        var result = await auction.save();

        res.result(200, result);

    } catch (err) {
        return res.error(500, 1000, err.message);
    }
}


var search = async function (req, res, next) {
    try {

        await Auction.createIndexes();
        let page = req.query._page || 0;
        recordLimit = req.query._limit || recordLimit;

        page = parseInt(page);
        recordLimit = parseInt(recordLimit);
        var result = await Auction.find({ $text: { $search: req.query.q } })
        res.result(200, result);

    } catch (err) {
        console.log(err);

        return res.error(500, 1000, err.message);
    }
}



var topUsers = async function (req, res, next) {
    try {

      
        recordLimit = req.query._limit || recordLimit;
        recordLimit = parseInt(recordLimit);
       
        var result =  await  Auction.aggregate()                           
        .group({
             _id:{email:"$user.email", name:"$user.name"}, 
             countTopUsers:{$sum:1} })
        .project({
                  '_id' : 0,
                  'name': '$_id.name',
                'countTopUsers':'$countTopUsers'})
        .limit(recordLimit);



        res.result(200, result);

    } catch (err) {
        console.log(err);

        return res.error(500, 1000, err.message);
    }
}

module.exports = {
    find,
    findOne,
    save,
    search,
    addBid,
    like,
    findUserAuction,
    findInfiniteScroll,
    topUsers
};
