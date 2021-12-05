const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.get('/',(req,res)=>{
    res.render('index');
})
app.set('view engine','ejs');
app.use(express.static('public'));

const dbURL = "localhost:27017/IITG-Connect";
mongoose.connect(dbURL,()=>{
    console.log("connected to database");
    app.listen('3000',()=>{
        console.log("listening at 3000");
    });
})

