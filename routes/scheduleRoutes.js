const express = require('express');
const router = express.Router();
const { getSchedule, setCheckpoint } =require('../controllers/scheduleController');
const { protect } = require('../middleware/authMiddleware')

router.get("/", protect, getSchedule);
router.post("/", protect, setCheckpoint);

module.exports = router;