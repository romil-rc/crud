const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT;
const dbURI = process.env.DB_URI;

mongoose.connect(dbURI, (err)=>{
    if(err) console.log(err);
    else console.log('Connected to MongoDB');
})
//  Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/notes', require('./routes/notes'));

app.listen(port, ()=>{
    console.log(`Connected to port.`);
})