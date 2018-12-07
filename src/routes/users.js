const express = require('express')
const authenticate = require('../middlewares/authenticate')
const { signUp, currentUser } = require('../controllers/users')
const router = express.Router()

router.post('/SignUp', signUp)
router.get('/current_user', authenticate, currentUser)

module.exports = router
