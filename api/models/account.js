const mongoose = require('mongoose');

const acoountSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    cnic:{
        type:Number,
        required:true,
        minlength : 13,
        maxlength : 13,
        unique:true
    },
    cnicimages:[],
    username:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true,
    },
    balance:{
        type: Number,
        required : true
    },
    isActive:{
        type: Number,
        required:true
    }

},{
    timestamps : true
});

module.exports = mongoose.model("Account", acoountSchema);