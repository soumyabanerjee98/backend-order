const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    contact:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", UserSchema);