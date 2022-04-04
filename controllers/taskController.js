const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');


const getTasks = asyncHandler(async (req,res) => {
    const task = await Project.find({user: req.user.id, _id: req.id}, 'tasks')
    res.status(200)
    res.json(task)

})

const findById = (req,res) => {
    User.findOne({_id: req.params.id})
        .then(user => res.json(user))
        .catch(err => res.json(err));
}

const setTask = asyncHandler(async (req, res) => {
    if(!req.body.tasks.taskName || !req.body.tasks.taskDescription) {
        res.status(400).send('Please add valid task')
    }

    const task = await Project.findOneAndUpdate(
        {_id: req.id},
        {$set:
        {"tasks.$.taskName": req.body.tasks.taskName,
        "tasks.$.taskDescription": req.body.tasks.taskDescription
        }}
        
    )   
    res.status(200).json(task)
});

module.exports = {
    getTasks,
    setTask,
    findById,
}