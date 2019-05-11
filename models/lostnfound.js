const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lostnfoundSchema = new Schema({
    lostStatus: {
        type: Number,    //itemLost=1, itemFound=2, itemRecovered=3
        required: true
    },
    name: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    time: {
        type: String
    },
    date: {
        type: String
    },
    description: {
        type: String
    },
    contact: {
        type: String
    },
    address: {
        type: String
    }
});


const Lostnfound = mongoose.model("lostnfound", lostnfoundSchema);
module.exports = Lostnfound;
