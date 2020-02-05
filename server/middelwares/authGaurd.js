const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        let token = '';
        if(req.headers.authorization) {
            token= req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, global.gConfig.secret);

            if(decodedToken && decodedToken.email) {
              
                next();
            }
        }
        else {
            return next({status: 200, code: 403, message: 'Forbidden, user identity is required'}, req, res, next);
        }
    }
    catch (err) {
        return next({status: 200, code: 403,message: err.message}, req, res, next);
    }


};