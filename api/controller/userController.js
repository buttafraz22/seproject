const User = require("../models/user");
const crypto = require("crypto");
const UserAudit = require("../models/userAudit");
const jwt = require('jsonwebtoken'); // Import the jwt library
const Account = require('../models/account');


/* CRUD Operations */
async function createUser(req, res) {
  try {
    const userName = req.body.userName;
    const password = req.body.password;
    const role = req.body.role;
    const IS_ACTIVE = 1

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    const user = new User({
      userName,
      password: hashedPassword,
      role,
      isActive : IS_ACTIVE
    });

    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getUser(req, res) {
  try {
    const userId = req.body.id;

    const user = await User.findById({_id: userId});

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if(user.isActive == 0){
      return res.status(404).json({error : "User not found."})
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function updateUser(req, res) {
  try {
    const userId = req.body.id;

    const user = await User.findById({_id:userId});

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    /* Make an audit object for logging all db changes. */

    const userBefore = {
      "username_before" : user.userName,
      "password_before" : user.password,
      "role_before" : user.role,
      "isActive_before" : user.isActive
    };

    user.userName = req.body.userName;
    user.password = crypto.createHash("sha256").update(req.body.password).digest("hex");

    await user.save();

    const audit = new UserAudit({
      userId : user._id,
      userBefore,
      userAfter : {
        "username_after" : user.userName,
        "password_after" :  user.password, 
        "role_after" : user.role, 
        "isActive_After" : user.isActive
      }
    })

    await audit.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.body.id;

    const user = await User.findById({_id:userId});

    /* Make an audit object for logging all db changes. */

    const userBefore = {
      "username_before" : user.userName,
      "password_before" : user.password,
      "role_before" : user.role,
      "isActive_before" : user.isActive
    };

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.isActive = 0;
    await user.save();

    const audit = new UserAudit({
      userId : user._id,
      userBefore,
      userAfter : {
        "username_after" : user.userName,
        "password_after" :  user.password, 
        "role_after" : user.role, 
        "isActive_After" : user.isActive
      }
    })

    await audit.save();

    res.status(204).send({success : "User deleted"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const login = async(req, res) => {
  try {
      /* console.log(req.body) */
      const { userName, password } = req.body;
      const user = await User.findOne({ userName });
      if (!user) return res.status(404).json({ error: 'User not found' });


      const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

      if (user.password !== hashedPassword) return res.status(401).json({ error: 'Invalid password, try again!!' });
      var token = GenerateToken(user);
      /* console.log(token) */
      if(user.role === "admin"){
        return res.status(200).json({
          message: 'Logged in successfully',
          username: userName,
          _id: user._id,
          role: user.role,
          token: token,
      });
    }else{
        return res.status(200).json({
          message: 'Logged in successfully',
          username: userName,
          _id: user._id,
          role: user.role,
          token: token,
          account : await Account.findOne({username : user.userName})
      });
    }
  } catch (err) {
      return res.status(500).json({ message: err });
  }

};

/* Helping functions */
const GenerateToken = (user) => {

  const payload = {
      role: user.role,
      id: user._id,
  };

  const SECRET_KEY = 'IWTGO26f2003';
  const token = jwt.sign(payload, SECRET_KEY);

  return token;

};

module.exports = { createUser, getUser, updateUser, deleteUser, login };
