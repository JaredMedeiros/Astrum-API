const express = require('express');
const router = express.Router();
const { getTasks, setTask, findById } =require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware')

router.get("/", getTasks);
// router.get("/:id", protect, findById)
router.post("/", setTask);

module.exports = router;