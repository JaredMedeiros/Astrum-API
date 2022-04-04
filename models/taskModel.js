const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    taskName:{
        type: String,
    },

    taskDescription: {
        type: String,
    },

    assignedTo: {
        type: String,
    },

    status: {
        type: String,
    },

    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
})

module.exports = mongoose.model('Task', taskSchema)