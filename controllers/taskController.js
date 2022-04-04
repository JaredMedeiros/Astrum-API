const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');


const getTasks = asyncHandler(async (req,res) => {
    const task = await Project.find({user: req.user.id, _id: req.id}, 'tasks')
    res.status(200)
    res.json(task)

})

// const getOneTask = (req,res) => {
//     Project.findOne({taskName req.params.id})
//         .then(user => res.json(user))
//         .catch(err => res.json(err));
// }

const setTask = asyncHandler(async (req, res) => {
    if(!req.body.taskName || !req.body.taskDescription) {
        res.status(400).send('Please add valid task')
    }

    const task = await Project.findOneAndUpdate(
        {user: req.user.id},
        {tasks: {taskName : req.body.taskName, taskDescription: req.body.taskDescription}
        },
        {upsert: true, new: true}
        
    )   
    res.status(200).json(task)
});

module.exports = {
    getTasks,
    setTask,
    // findById,
}