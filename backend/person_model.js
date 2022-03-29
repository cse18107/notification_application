const mongoose = require('mongoose');

const Person_Schema = new mongoose.Schema({
    userId:String,
    name:String,
    address:String,
    age:String,
    validity:Boolean
});

const Person = mongoose.model('Person',Person_Schema);

module.exports = Person;