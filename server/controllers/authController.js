const User = require('../models/users');

const save = async function(req, res)
{
    try{
        const user = new User(req.body);
        user.password = User.hashPassword(req.body.password);

        const result =  await user.save();

        res.result(200,result);
    }catch(err)
    {
        return res.error(500,1000,err.message);
    }
}
    
module.exports = {
    save
};