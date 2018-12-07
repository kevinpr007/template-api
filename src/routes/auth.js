const express = require('express')
const {
	login,
	confirmation,
	resetPasswordRequest,
	validateToken,
	resetPassword,
} = require('../controllers/auth')
const router = express.Router()

router.post('/login', login)
router.get('/confirmation', confirmation)
router.post('/reset_password_request', resetPasswordRequest)
router.post('/validate_token', validateToken)
router.post('/reset_password', resetPassword)

module.exports = router
