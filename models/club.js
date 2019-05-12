const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    description: {
        type: String
    },
    followed: {    //issue
        type: Boolean,
        default: false
    }
    coordinators: {
        type : Array , 
        default : []
    },
    subCoordinators: {
        type : Array , 
        default : []
    },
    events: {
        type : Array , 
        default : []
    },
    pages: {
        type : Array , 
        default : []
    },
    website: {
        type: String
    },
    image: {
        type: String
    }


const Club = mongoose.model("club", clubSchema);
module.exports = Club;
