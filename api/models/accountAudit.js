const mongoose = require("mongoose");

const acoountSchema = new mongoose.Schema(
  {
    AccountId:{
        type: String
    },
    AccountBefore: {
        type: Object
    },
    AccountAfter : {
        type : Object
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AccountAudit", acoountSchema);