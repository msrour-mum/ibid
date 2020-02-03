var Auction = require('../models/auctions');
var Comment = require('../models/comments');


var find = async function(req, res, next)
{
    try{

        await Auction.createIndexes();
        var result =  await Auction.findById(req.params.id)
                                   .sort('-comments.creation_date');

       
        res.send(result.comments);
        res.end();

       // return res.status(200,result).end();
        
    }catch(err)
    {
        console.log(err.message);
       // return res.error(500,1000,err.message);
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
          
      
        res.send(comment);
        res.end();
       // return res.status(200,result).end();
    }catch(err)
    {
        return res.error(500,1000,err.message);
    }
}


module.exports = {
    find,
    save
};