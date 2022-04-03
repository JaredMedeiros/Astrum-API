const express = require('express')
const router = express.Router();
const {registerUser, loginUser, getMine, findAll, findById} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/users', findAll);
router.get('/me', protect, getMine);
router.get('/users/:id', protect, findById);


module.exports = router;