const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = new mongoose.Schema({

    projectName: { 
        type: String,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

},
{timestamps:true});

module.exports = mongoose.model('Project', projectSchema)
