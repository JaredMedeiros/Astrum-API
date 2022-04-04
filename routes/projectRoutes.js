const express = require('express');
const router = express.Router();
const { getProjects, setProject } =require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware')

router.get("/", getProjects);
router.post("/", setProject);

module.exports = router;