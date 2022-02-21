const router = require("express").Router();
const User = require('../models/Users');
const { verifyToken, verifyAndAuth } = require('./verifyToken');

router.put(":/id", verifyAndAuth, async (req, res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECPASS).toString();
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {new: true})
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;