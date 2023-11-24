const Account = require('../models/account');
const Bill = require('../models/bill');
const stripe = require('stripe')('sk_test_51NdFjDHO3kvTfl2ztnE0sklP2TqStoumuLZsx3UdTs9HGtdQ0nWUQKkGAlW1EOFsqsyquXA2ct95P0pX6WhoEUM900W5ZjaFQZ');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const PayBill = async(req, res) =>{
    const {id,
        date,
        amount, 
        accountFrom,
        token
    } = req.body

    /* console.log(req.body) */
    try {

        const accFrom = await Account.findOne({_id  : accountFrom});

        if(!accFrom) return res.status(404).json({message : 'User invalid account.'})

        const customer = await stripe.customers.create({
            name: accFrom.name,
            source: token.id
        })
        const payment = await stripe.charges.create({
            amount : amount * 100,
            customer : customer.id,
            currency : 'INR',
        }, {
            idempotencyKey: uuidv4()
        })

        // console.log(payment)
        if(payment){
            const bill = new Bill({
                transactionId : id,
                date,
                amount,
                accountFrom: new mongoose.Types.ObjectId(accFrom._id),
                payment
            })

            await bill.save();
            res.status(201).send({ url : payment.receipt_url})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message : error.messsage })
    }
}

module.exports = { PayBill }