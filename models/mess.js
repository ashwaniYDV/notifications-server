const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    messChoice: {
        type:Number,
    },
    fullday : {
        type : Array,
        "default" : []
    },
    breakfast : {
        type : Array,
        "default" : []
    },
    lunch : {
        type : Array,
        "default" : []
    },
    snacks : {
        type : Array,
        "default" : []
    },
    dinner : {
        type : Array,
        "default" : []
    }
});


const Mess = mongoose.model("mess", messSchema);
module.exports = Mess;
