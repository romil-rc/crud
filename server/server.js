const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');

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

//  Route
app.use('/api/notes', require('./routes/notes'));

//  DEPLOYMENT
__dirname = path.resolve();
console.log(__dirname);
if(process.env.NODE_ENV==="production"){
    console.log("inside production");
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
} else {
    app.get('/', (req, res)=>{
        res.send("API running");
    })
}

app.listen(port, ()=>{
    console.log(`Connected to port.`);
})