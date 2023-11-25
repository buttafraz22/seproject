/* Models */
const User = require("../models/user");
const Account = require('../models/account');

/* Libraries */
const crypto = require("crypto");
const jwt = require('jsonwebtoken'); // Import the jwt library
const multer = require('multer');

/* Audit Models */
const UserAudit = require("../models/userAudit");
const AccountAudit = require('../models/accountAudit');


/* Multer disk storage */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        const uniqueFilename = Date.now() + file.originalname;
        cb(null, uniqueFilename);
    },
}); 

const upload = multer({ storage });

const createAccount = async (req, res) => {
    try {
        // Multer middleware will process the file upload
        upload.array('images',2)(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // Multer error occurred
                console.error(err.message)
                return res.status(500).json({ error: err.message });
            } else if (err) {
                // Other errors
                console.error(err.message)
                return res.status(500).json({ error: err.message });
            }

            // File upload was successful
            // Extract data from the request body
            const { name, cnic, username, password,balance, images } = req.body;
            console.log(req.body)

            /* console.log(req.body) */

            // Get the file path from the request
            const imagePaths = req.files ? req.files.map(file => file.path) : []
            

            // Create a new account object
            const newAccount = new Account({
                name,
                cnic,
                username,
                password : crypto.createHash("sha256").update(password).digest("hex"),
                cnicimages: imagePaths, // Add the profile image to the cnicimages array,
                isActive:1,
                balance
            });
            // Save the account to the database
            const savedAccount = await newAccount.save();

            const user = new User({
                userName : username,
                password : crypto.createHash("sha256").update(password).digest("hex"),
                role : "user",
                isActive : 1
            })

            await user.save();
            

            // Return the saved account as JSON
            res.status(201).json(savedAccount);
        });
    } catch (err) {
        console.error(err)
        // Handle any other errors
        res.status(500).json({ error: "Backend error" });
    }
};

const getAllAccounts = async (req,res) => {
    try {

        let accounts = await Account.find({});

        if (!accounts || !accounts[0]) return res.status(404).send('No account exists.');


        /* Check for deleted accounts. */
        accounts = accounts.filter((account) => account.isActive !== 0);

        res.status(202).json(accounts);
    } catch (error) {
        res.status(500).json({"message" : error.message})
    }
}

const getOneAccount = async(req,res) => {
    try {
        let id = req.params.id;

        const user = await Account.findOne({_id : id});
        if(!user){
            return res.status(404).send('The user with the given ID was not found');
        }

        res.status(202).json(user);
    } catch (error) {
        res.status(500).json({"message" : error.message})
    }
}

const updateAccount = async(req, res) => {
    try{

        /* console.log(req.body) */
        const accountId = req.body._id;
        // console.log(accountId)
        const account = await Account.findOne({_id : accountId});

        /* console.log(account) */

        if (!account){
            res.status(404).json({ error : 'Account not existent.'});
        }

        const accountBefore = {
            name : account.name,
            cnic : account.cnic,
            balance : account.balance
        }

        account.name = req.body.name;
        account.cnic = req.body.cnic;
        account.balance = req.body.balance;

        
        await account.save();

        console.log(account)

        const accountAfter = {
            name : account.name,
            cnic : account.cnic,
            balance : account.balance
        }

        const audit = new AccountAudit({
            AccountId : accountId,
            AccountBefore : accountBefore,
            AccountAfter : accountAfter
        })

        await audit.save();

        res.status(203).json({ stts: "update successfull"});
    }catch(err){
        res.status(500);
    }
}

const deleteAccount = async(req, res)=>{
    try{

        /* console.log(req.body) */
        const accountId = req.body._id;
        // console.log(accountId)
        const account = await Account.findOne({_id : accountId});

        /* console.log(account) */

        if (!account){
            res.status(404).json({ error : 'Account not existent.'});
        }

        const accountBefore = {
            name : account.name,
            cnic : account.cnic,
            balance : account.balance,
            isActiveBefore : 1
        }

        
        account.isActive = 0;    // inactivate the account
        
        await account.save();


        const accountAfter = {
            name : account.name,
            cnic : account.cnic,
            balance : account.balance,
            isActiveAfter : 0
        }

        const audit = new AccountAudit({
            AccountId : accountId,
            AccountBefore : accountBefore,
            AccountAfter : accountAfter
        })

        await audit.save();

        res.status(204).json({ stts: "Delete successfull"});
    }catch(err){ 
        res.status(500);
    }
}

module.exports = {createAccount, getAllAccounts, getOneAccount, updateAccount, deleteAccount}