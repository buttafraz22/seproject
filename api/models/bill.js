const mongoose = require('mongoose');
const Account = require('./account')


const billSchema = new mongoose.Schema({
    transactionId:{
        type : String,
        required: true
    },
    accountFrom:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Account
    },
    date:{
        type: Date
    },
    amount:{
        type : Number,
        required:true
    },
    payment:{
        type: Object,
        required:true
    }
},{
    timestamps : true
});

module.exports = mongoose.model("Bills", billSchema);