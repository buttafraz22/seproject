const mongoose = require('mongoose');
const Account = require('./account')

const acoountSchema = new mongoose.Schema({
    accountFrom : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Account
    },
    accountTo : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Account
    },
    balance:{
        type:Number,
        required:true
    }
},{
    timestamps : true
});

module.exports = mongoose.model("Transaction", acoountSchema);