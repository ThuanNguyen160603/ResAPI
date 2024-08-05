const jwt = require('jsonwebtoken');
const config = require('../config');

const checkToken = async function(req, res, next){
    const token = req.header("Authorization").split(' ')[1];
    if(token){
        jwt.verify(token, config.SECRETKEY, async function(err) {
        if(err){
            res.status(403).json({ "status": 403, "err": err});
        }else{
            next();
        }
        });
    }else{
        res.status(401).json({ "status": 401});
    }
}

module.exports = checkToken;