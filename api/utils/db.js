const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

let uri = "mongodb://127.0.0.1:27017/bank-system";

mongoose.connect(uri)

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(`Failed to connect with database due to ${err}`)
});

db.once('open', () =>{
    console.log('Local db: 200');
});