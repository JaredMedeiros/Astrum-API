const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');

const getProjects = asyncHandler(async (req,res) => {
    const projects = await Project.find({user: req.user.id})

    res.status(200).json(projects)
})

const setProject = asyncHandler(async (req, res) => {
    if(!req.body.projectName) {
        res.status(400).send('Please add valid project')
    }

    const project = await Project.create({
        projectName: req.body.projectName,
        user: req.user.id,
        team: {teammateName: req.body.teammateName, 
                teammateEmail: req.body.teammateEmail},
    })

    res.status(200).json(project)
});

module.exports = {
    getProjects,
    setProject,
}