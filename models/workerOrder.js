// reference mongoose
const mongoose = require('mongoose');

//worker Order schema
const workerOrderSchema = new mongoose.Schema({

    Title:           String,
    Description:     String,
    Deadline  :      Date,
    Workers:[{
        WorkerId: String,
        Name:String,
    }],
    max: Number
});

module.exports= mongoose.model('WorkerOrder',workerOrderSchema);