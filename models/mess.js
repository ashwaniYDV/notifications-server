const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messSchema = new Schema({
    studentMongoId: {
        type: String, //user._id
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    messChoice: {
        type:Number, 
        required: true
    },
    currentMeal: {
        type: String
    },
    takenMeals : {
        type : Array,
        "default" : []
    },
    cancelledMeals : {
        type : Array,
        "default" : []
    },
    timestamp: {
        type:Number,
        default: new Date().getTime()
    },
});


const Mess = mongoose.model("mess", messSchema);
module.exports = Mess;
