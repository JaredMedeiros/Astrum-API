const express = require('express')
const router = express.Router();
const {registerUser, loginUser, getMine} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware');

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMine)


module.exports = router;