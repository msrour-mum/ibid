var mongoose = require('mongoose');
var Auction = require('../models/auctions');
var Comment = require('../models/comments');


let recordLimit = 10;


var find = async function(req, res, next)
{
    try{

        let page = req.query._page || 0;
        recordLimit = req.query._limit || recordLimit;
        
        page = parseInt(page);
        recordLimit = parseInt(recordLimit);

        await Auction.createIndexes();
        var result =  await Auction.aggregate()
                                   .sort('-comments.creation_date')
                                   .match({ _id: mongoose.Types.ObjectId(req.params.id)})
                                   .unwind('comments')
                                   .limit(recordLimit)
                                   .skip(recordLimit*page)
                                   .project({
                                             'user' : '$comments.user',
                                             'comment_text' : '$comments.comment_text',
                                             'creation_date' : '$comments.creation_date'});

    //                                await Auction.aggregate( [ { $match : { _id: Auction.Types.ObjectId(req.params.id)} },
    // { $unwind : "$messages" } ,
    // { $sort : { 'messages.createDate' : -1} },
    //  { $limit : 2 },{ $skip : 2 }
    //  { $project : { _id: 0,'message':'$messages.message','user':'$messages.user'} } ]

         console.log("find 2", result);                  
         res.result(200,result);
        
        }catch(err)
        {
            console.log("err find", err);
            return res.error(500,1000,err.message);
        }
}

var save = async function(req, res,next)
{
    try{
        const comment = new Comment(
            req.body.user,
            req.body.comment_text
        );

       
        var auction = await Auction.findById(req.params.id);

        //Partial saving
        auction.comments.push(comment);
        
        await auction.save();  
          
      
        res.result(200,comment);
        
    }catch(err)
    {
        console.log(err);
       return res.error(500,1000,err.message);
    }
}


module.exports = {
    find,
    save
};