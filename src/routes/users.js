const express = require('express')
const authenticate = require('../middlewares/authenticate')
const { signUp } = require('../controllers/users')
const { currentUser } = require('../controllers/auth')
const router = express.Router()

router.post('/SignUp', signUp)
router.get('/current_user', authenticate, currentUser)

module.exports = router
