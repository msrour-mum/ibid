var User = require('../models/users');



const recordLimit = 10;


var find = async function(req, res, next)
{
    try{

        let page = req.query.page || 0;
       
        await User.createIndexes();
        var result = await User.find({})
        .sort('-creation_date')
        .limit(recordLimit)
        .skip(recordLimit*page)
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
       
        await User.createIndexes();
        var result =  await User.findById(req.params.id);

       
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
        const user = new User(req.body);
        var result =  await user.save();  
          
      
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
    save
};