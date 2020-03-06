const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedSchema = new Schema({
    feedPoster: {
        type: Schema.Types.ObjectId,
        ref: 'user',
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
    eventId: {
        type:Number,
        default: new Date().getTime()
    },
    postLinks : {
        type : Array , 
        "default" : []
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    active: {
        type: Boolean,
        default: true,
        required: true
    }
});


const Feed = mongoose.model("feed", feedSchema);
module.exports = Feed;
