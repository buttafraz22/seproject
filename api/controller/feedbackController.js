const Feedback = require("../models/feedbck");
const Account = require("../models/account");
const mongoose = require('mongoose');


const makeFeedback = async(req, res)=>{
    try{
        const { content, accountId, date } =req.body;

        const account = await Account.findById(accountId);
        if(!account) return res.status(404).json({message : 'Account Not Found.'});

        const feedback = new Feedback({ 
            content,
            author : new mongoose.Types.ObjectId(account._id),
            date
        })

        await feedback.save();
        res.status(200).json({message: 'success'})
    }catch(err){
        res.status(501).json({error : err.message})
    }
}

const getFeedbacks = async (req, res) => {
    try {
      const feedbacks = await Feedback.find().populate('author', 'name cnic');
  
      const feedbackList = feedbacks.map((feedback) => ({
        content: feedback.content,
        authorName: feedback.author.name,
        authorCnic: feedback.author.cnic,
        date : feedback.date
      }));
  
      res.status(200).json({ feedbackList });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = {makeFeedback, getFeedbacks}