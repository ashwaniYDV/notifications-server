const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedSchema = new Schema({
    feedPoster: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    relatedClub: {
        type: Schema.Types.ObjectId,
        ref: 'club'
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
        default: new Date().getTime()
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
