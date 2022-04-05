const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = new mongoose.Schema({

    projectName: { 
        type: String,
    },

    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },

    team: [
        {
            teammateName: {
                type: String,
            },

            teammateEmail: {
                type:String,
            },
        },
    ],

    tasks: [
        {
            taskName:{
                type: String,
            },
        
            taskDescription: {
                type: String,
            },
        
            assignedTo: {
                type: String,
            },
        
            // status: {
            //     type: String,
            // },
        },
    ],

    checkpointList: [
            
        {
            checkpointTitle: {
                type: String,
            },
        
            dueDate: {
                type: String,
            },
            
        },
    ],  
},

{timestamps:true});

module.exports = mongoose.model('Project', projectSchema)
