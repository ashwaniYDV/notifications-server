const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedSchema = new Schema({
    feedPoster: {
        type: String, //instituteId
        required: true
    },
    eventVenue: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventImageUrl: {
        type: String
    },
    eventDate: {
        type:Number, 
        required: true
    },
    eventId: {
        type:Number,
        default: new Date().getT
    },
    coordinators : { 
        type : Array , 
        "default" : []
    },
    postLinks : { 
        type : Array , 
        "default" : []
    }
});


const Feed = mongoose.model("feed", feedSchema);
module.exports = Feed;
