const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        JWT.verify(token, process.env.SECJWT), (err, data) => {
            if (err) res.status(403).json("Invalid Token");
            req.data = data;
            next();
        }
    }
    else{
        return res.status(401).json("Not Authorised");
    }
}

const verifyAndAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            return res.status(403).json("Not Allowed");
        }
    })
}

module.exports = { verifyToken, verifyAndAuth };