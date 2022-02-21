const router = require("express").Router();
const User = require('../models/Users');
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        contact: req.body.contact,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECPASS).toString(),
    });
    try{
        const registeredUser = await newUser.save();
        res.status(201).json(registeredUser);
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    try{
        const existingUser = await User.findOne({
            username: req.body.username
        });
        !existingUser && res.status(401).json("Not an existing user");

        const accessToken = JWT.sign({
            id: existingUser._id,
            isAdmin: existingUser.isAdmin
        },
        process.env.SECJWT,
        {expiresIn: "8d"}
        );

        const encryptPassword = CryptoJS.AES.decrypt(existingUser.password, process.env.SECPASS);
        const orPassword = encryptPassword.toString(CryptoJS.enc.Utf8);
        orPassword !== req.body.password && res.status(401).json("Wrong Password");
        const {password, ...rest} = existingUser._doc;
        res.status(200).json({...rest, accessToken});
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;