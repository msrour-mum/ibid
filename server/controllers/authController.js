const User = require('../models/users');
const jwt = require('jsonwebtoken');

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

var authenticate = async function (req, res) {

    try {
        let user = await User.findByEmail(req.body.email);

        if (user && User.isValid(req.body.password, user.password)) {
            let token = jwt.sign({
                _id: user._id,
                username: user.email,
                name: user.name,
               photosUrl: user.photosUrl
            }, global.gConfig.secret, {expiresIn: global.gConfig.token_expiry});

            res.result(200, {token: token});
        } else {
            res.error(200, 401, "Invalid user email or password");
        }
    }
    catch (err) {
        return res.error(500,-1,err.message);
    }
};
module.exports = {
    save,
    authenticate
};