var Auction = require('../models/auctions');
var Comment = require('../models/comments');


var find = async function(req, res, next)
{
    try{

        await Auction.createIndexes();
        var result =  await Auction.findById(req.params.id)
                                   .sort('-comments.creation_date');

       
         res.result(200,result);
        
        }catch(err)
        {
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

        var auction = await Auction.findOne(req.params.id);

        //Partial saving
        auction.comments.push(comment);
        
        await auction.save();  
          
      
        res.result(200,comment);
        
    }catch(err)
    {
       return res.error(500,1000,err.message);
    }
}


module.exports = {
    find,
    save
};