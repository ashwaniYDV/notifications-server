const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    club: {
        type: Schema.Types.ObjectId,
        ref: 'club',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
    description: {
        type: String
    },
    image_uri: {
        type: String
    },
    link: {
        type: String
    },
    audience: {
        type: Array,
        required: true
    },
    message_id: {
        type: Number
    }
});

const Notification = mongoose.model("notification", notificationSchema);
module.exports = Notification;