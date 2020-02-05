var mongoose = require('mongoose');

var Auction = require('../models/auctions');
var Comment = require('../models/comments');


let recordLimit = 10;


var find = async function(req, res, next)
{
    try{

        let page = req.query._page || 0;
        recordLimit = req.query._limit;// || recordLimit;
        
        page = parseInt(page);
        recordLimit = parseInt(recordLimit);

        await Auction.createIndexes();
        var result =  await  Auction.aggregate()
                                   
                                   .match({ _id: mongoose.Types.ObjectId(req.params.id)})
                                   .unwind({
                                    path: "$comments",
                                    //includeArrayIndex: "comments.creation_date",
                                 //   preserveNullAndEmptyArrays: true
                                  })
                                   .project({
                                             'user' : '$comments.user',
                                             'comment_text' : '$comments.comment_text',
                                             'creation_date' : '$comments.creation_date'})
                                    //.sort('-comments.creation_date')
                                    
                                   //.skip(recordLimit*page)
                                   .limit(recordLimit);
        var totalCount = 0;
        if(result.length > 0)
{
        var count =  await  Auction.aggregate()
                                   .match({ _id: mongoose.Types.ObjectId(req.params.id)})
                                   .unwind('comments')
                                   .project({'comment_text' : '$comments.comment_text'})
                                   .group({"_id": null,"totalCount": { "$sum": 1 }});
        totalCount = count[0].totalCount;
}
        
                     
         res.result(200,{result,totalCount});
        
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