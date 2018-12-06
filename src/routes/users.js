const express = require('express')
const authenticate = require('../middlewares/authenticate')
const { signUp, currentUser } = require('../controller/users')
const router = express.Router()

//TODO:Add Sign Up
router.post('/SignUp', signUp)
router.get('/current_user', authenticate, currentUser)

module.exports = router
