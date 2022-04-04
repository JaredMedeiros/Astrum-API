const express = require('express');
const router = express.Router();
const { getSchedules, setSchedule } =require('../controllers/scheduleController');
const { protect } = require('../middleware/authMiddleware')

router.get("/", getSchedules);
router.post("/", setSchedule);

module.exports = router;