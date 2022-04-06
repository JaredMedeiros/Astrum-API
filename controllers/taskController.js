const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');


const getTasks = asyncHandler(async (req,res) => {
    const task = await Project.find({user: req.user.id, _id: req.id}, 'tasks')
    res.status(200)
    res.json(task)

})

// const getOneTask = (req,res) => {
//     Project.findByID((req.params.id.id), function (err, doc) {
//         if(err) return res.send(err);
//         return res.send(doc)
//     });    
        
// }

const setTask = asyncHandler(async (req, res) => {
    if(!req.body.taskName || !req.body.taskDescription) {
        res.status(400).send('Please add valid task')
    }

    Project.findByIdAndUpdate((req.params.id),
    {$push: {tasks: {
        taskName: req.body.taskName,
        taskDescription: req.body.taskDescription,
        assignedTo: req.body.assignedTo}
    }}, 
    
    {upsert: true, new: true},
    
        function(err, doc) {
        if(err) return res.send(err);
        return res.send(doc)
    });
});




module.exports = {
    getTasks,
    setTask,
    // findById,
}