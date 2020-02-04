const User = require('../models/users');

let recordLimit = 10;

const find = async function(req, res, next)
{
    try{

        let page = req.query._page || 0;
        recordLimit = req.query._limit || recordLimit;

        page = parseInt(page);
        recordLimit = parseInt(recordLimit);


        await User.createIndexes();
        var result = await User.find({})
        .sort('-creation_date')
        .limit(recordLimit)
        .skip(recordLimit*page)
        .exec();

     
        res.result(200,result);
        
    }catch(err)
    {
       return res.error(500,1000,err.message);
    }
}

const findOne = async function(req, res, next)
{
    try{
       
        await User.createIndexes();
        var result =  await User.findById(req.params.id);

       
        res.result(200,result);
        
    }catch(err)
    {
       return res.error(500,1000,err.message);
    }
   
}

module.exports = {
    find,
    findOne
};