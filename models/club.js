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
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'feed'
    }],
    followers: {
        type: Number,
        default: 0
    },
    coordinators: {
        type : Array ,
        default : []
    },
    subCoordinators: {
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
});

const Club = mongoose.model("club", clubSchema);
module.exports = Club;
