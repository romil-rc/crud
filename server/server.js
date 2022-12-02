const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const dbURI = process.env.DB_URI || `mongodb+srv://saahil:1xWgj1vbKuoEnGH1@cluster0.hhppdti.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(dbURI, (err)=>{
    if(err) console.log(err);
    else console.log('Connected to MongoDB');
})
//  Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/notes', require('./routes/notes'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static("../client/build"));
}


app.listen(port, ()=>{
    console.log(`Connected to port.`);
})