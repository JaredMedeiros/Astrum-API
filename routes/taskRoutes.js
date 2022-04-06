const express = require('express');
const router = express.Router();
const { getTasks, setTask, getOne } =require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware')

router.get("/", getTasks);
// router.get("/:id/:id", getOne)
router.post("/:id", setTask);

module.exports = router;