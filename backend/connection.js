const mongoose = require('mongoose');

function connectDatabase() {
    mongoose.connect(`mongodb+srv://cse18107:cse18107@cluster0.g623y.mongodb.net/person?retryWrites=true&w=majority`).then(()=>{
        console.log('Database connected successfully');
    }).catch(()=>{
        console.log('Something is wrong');
    })
}



module.exports = connectDatabase;