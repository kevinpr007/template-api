const express = require('express')
const {
	login,
	confirmation,
	resetPasswordRequest,
	validateToken,
	resetPassword,
} = require('../controller/auth')
const router = express.Router()

//TODO:    /login
router.post('/', login)
router.get('/confirmation', confirmation)
router.post('/reset_password_request', resetPasswordRequest)
router.post('/validate_token', validateToken)
router.post('/reset_password', resetPassword)

module.exports = router
