const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');


const getSchedule = asyncHandler(async (req,res) => {
    const schedule = await Project.find({user: req.user.id, _id: req.id}, 'checkpointList')
    res.status(200)
    res.json(schedule)

})

// const getOneTask = (req,res) => {
//     Project.findOne({taskName req.params.id})
//         .then(user => res.json(user))
//         .catch(err => res.json(err));
// }

const setCheckpoint = asyncHandler(async (req, res) => {
    if(!req.body.checkpointTitle || !req.body.dueDate) {
        res.status(400).send('Please add valid checkpoint')
    }

    Project.findByIdAndUpdate((req.params.id),
    {$push: {checkpointList: {
        checkpointTitle: req.body.checkpointTitle,
        dueDate: req.body.dueDate,
        }
    }}, 
    
    {upsert: true, new: true},
    
        function(err, doc) {
        if(err) return res.send(err);
        return res.send(doc)
    });
});

module.exports = {
    getSchedule,
    setCheckpoint,
    // findById,
}