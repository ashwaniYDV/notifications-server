const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const maintenanceSchema = new Schema({
    maintenancePoster: {
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


const Maintenance = mongoose.model("maintenance", maintenanceSchema);
module.exports = Maintenance;
