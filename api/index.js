require('./utils/db');
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.port || 3005;
const cors = require('cors');

const userRoute = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send({"message" : "Hello G"})
})

app.use('/user',userRoute);
app.use('/account',accountRoutes);
app.use('/transaction', transactionRoutes);



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})