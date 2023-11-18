require('./utils/db');
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.port || 5000;


const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({"message" : "Hello G"})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})