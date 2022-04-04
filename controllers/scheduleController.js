const asyncHandler = require('express-async-handler');
const Schedule = require('../models/scheduleModel');

const getSchedules = asyncHandler(async (req,res) => {
    const schedules = await Schedule.find({project: req.project.id})

    res.status(200).json(schedules)
})

const setSchedule = asyncHandler(async (req, res) => {
    if(!req.body.projectSchedule.checkpointTitle) {
        res.status(400).send('Please add valid schedule')
    }

    const schedule = await Schedule.create({
        checkpointTitle: req.body.projectSchedule.checkpointTitle,
        dueDate: req.body.projectSchedule.dueDate,
        project: req.project.id,
    })

    res.status(200).json(schedule)
});

module.exports = {
    getSchedules,
    setSchedule,
}