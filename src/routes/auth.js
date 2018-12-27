const express = require('express')
const {
	login,
	confirmation,
	resetPasswordRequest,
	validateToken,
	resetPassword,
	RefreshToken,
} = require('../controllers/auth')
const router = express.Router()

router.post('/login', login)
router.get('/confirmation', confirmation)
router.post('/reset_password_request', resetPasswordRequest)
router.post('/reset_password', resetPassword)
router.post('/validate_token', validateToken)
router.post('/RefreshToken', RefreshToken)

module.exports = router
