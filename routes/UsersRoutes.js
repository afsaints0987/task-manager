const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getUser} = require('../controllers/UsersController')
const {protect} = require('../middlewares/AuthMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/user', protect, getUser)

module.exports = router