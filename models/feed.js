const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedSchema = new Schema({
    eventVenue: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
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
        default: new Date().getTime()    //this is the time when post request is made
    },
    speakersGuests : { 
        type : Array , 
        "default" : []
    },
    eventCoordinators : { 
        type : Array , 
        "default" : []
    },
    socialMediaPosts : { 
        type : Array , 
        "default" : []
    }
});


const Feed = mongoose.model("feed", feedSchema);
module.exports = Feed;
