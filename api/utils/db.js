const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

let url = "mongodb://127.0.0.1:27017/bank-system";
// let url = "mongodb://localhost:27017,localhost:27018,localhost:27019/bank-system?replicaSet=replica-bank"



mongoose.connect(url)

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(`Failed to connect with database due to ${err}`)
});

db.once('open', () =>{
    console.log('Local db: 200');
});