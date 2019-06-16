// reference mongoose
const mongoose = require('mongoose');

//worker schema
const workerSchema= new mongoose.Schema({

    Name:           String,
    CompanyName:    String,
    Email:          String,


});

module.exports= mongoose.model('Worker',workerSchema);