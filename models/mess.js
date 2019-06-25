const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messSchema = new Schema({
    studentMongoId: {
        type: String, //user._id
        required: true
    },
    messChoice: {
        type:Number, 
        required: true
    },
    timestamp: {
        type:Number,
        default: new Date().getTime()
    },
    meals : { 
        type : Array ,
        "default" : []
    }
});


const Mess = mongoose.model("mess", messSchema);
module.exports = Mess;
