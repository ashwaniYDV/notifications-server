const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    complaintPoster: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    category: {
        type: Number,
        required: true
    },
    status: {
        type: String
    },
    problem: {
        type: String
    },
    imageUrl: {
        type: String
    }
});

const Complaint = mongoose.model("complaint", complaintSchema);
module.exports = Complaint;
