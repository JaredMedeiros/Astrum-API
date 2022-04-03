const mongoose = require('mongoose')


const projectSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    projectName: { 
        type: String,
    },
},
{timestamps:true});

module.exports = mongoose.model('Project', projectSchema)
