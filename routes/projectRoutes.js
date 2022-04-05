const express = require('express');
const router = express.Router();
const { getProjects, setProject, getOne } =require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware')

router.get("/", getProjects);
router.post("/", setProject);
router.get('/:id', getOne)

module.exports = router;