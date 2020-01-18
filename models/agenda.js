const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agendaSchema = new Schema({
    poster: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Processing"
    },
    problem: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String    
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    active: {
        type: Boolean,
        default: true
    }
});

const Agenda = mongoose.model("agenda", agendaSchema);
module.exports = Agenda;