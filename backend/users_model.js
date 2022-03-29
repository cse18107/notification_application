const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    subscription:{
        type:Object
    }
});

const User = mongoose.model('User',UserSchema);

module.exports = User;