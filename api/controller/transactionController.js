const Transaction = require('../models/transaction');
const Account = require('../models/account');
const mongoose = require('mongoose');

const makeTransaction = async (req, res) => {
    /* const session = await mongoose.startSession();
    session.startTransaction(); */
    try {
        const {
            accountFrom,
            accountTo,
            accountToName,
            balance
        } = req.body;

        const accountFromDb = await Account.findOne({ _id: accountFrom });

        if (!accountFromDb) return res.status(404).json({ message: 'Account Sender not found.' });

        const accountToDb = await Account.findOne({ cnic: accountTo });

        if (!accountToDb) return res.status(404).json({ message: 'Account Recipient not found.' });
        else if (accountToDb.name.toLowerCase() !== accountToName.toLowerCase()) {
            return res.status(409).json({ message: "The recipient's name doesn't match." });
        }

        if (balance > accountFromDb.balance) {
            return res.status(403).json({ message: "Balance is greater than sender balance." });
        }

        const tran = new Transaction({
            accountFrom: new mongoose.Types.ObjectId(accountFromDb._id),
            accountTo: new mongoose.Types.ObjectId(accountToDb._id),
            balance: balance
        });

        accountFromDb.balance -= balance;
        accountToDb.balance += balance;

        await accountFromDb.save(/* { session } */);
        await accountToDb.save(/* { session } */);
        await tran.save(/* { session } */);

        /* await session.commitTransaction();
        session.endSession(); */

        return res.status(201).json({ message: 'Success' });
    } catch (err) {
        /* await session.abortTransaction();
        session.endSession(); */
        res.status(500).json({ error: err.message });
    }
};

const getTransaction = async(req, res)=>{
    try {
        let { accountid } = req.params
        

        const transactions = await Transaction.find({ accountFrom : accountid})
        /* console.log(transactions)
 */
        const transactionsList = await Promise.all(transactions.map(async (tran) => {
            const accountToInfo = await Account.findById(tran.accountTo);
            return {
              accountTo: tran.accountTo,
              accountToName: accountToInfo.name,
              balance: tran.balance,
              date: tran.createdAt.toISOString().split('T')[0],
            };
          }));
          
          // Now you can use transactionsList as needed
          

        return res.status(200).json(transactionsList)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

module.exports = { makeTransaction, getTransaction }