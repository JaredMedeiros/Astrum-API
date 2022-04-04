const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');


const getTasks = asyncHandler(async (req,res) => {
    const tasks = await Task.find({project: req.project.id})

    res.status(200).json(tasks)
})

const findById = (req,res) => {
    User.findOne({_id: req.params.id})
        .then(user => res.json(user))
        .catch(err => res.json(err));
}

const setTask = asyncHandler(async (req, res) => {
    if(!req.body.taskName || !req.body.taskDescription) {
        res.status(400).send('Please add valid task')
    }

    const task = await Task.create({
        taskName: req.body.taskName,
        taskDescription: req.body.taskDescription,
        project: req.project.id,
    })   
});

module.exports = {
    getTasks,
    setTask,
    findById,
}