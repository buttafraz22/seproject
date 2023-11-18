const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId:{
        type: String
    },
    userBefore: {
        type: Object
    },
    userAfter : {
        type : Object
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UsersAudit", userSchema);