const mongoose = require('mongoose');
const Account = require('./account')


const feedSchema = new mongoose.Schema({
    content : String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Account
    },
    date : {
        type:Date
    }
},{
    timestamps : true
});

module.exports = mongoose.model("feeds", feedSchema);