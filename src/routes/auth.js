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

/**
 * @api {get} /auth/confirmation Confirmation
 * @apiName /auth/confirmation
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiDescription This route is used to validate and active your email.
 *
 * @apiPermission none
 *
 * @apiParam {String} token		This token is send it by the application to your email.
 *
 * @apiParamExample {json} Request-Example:
 *     http://localhost/api/auth/confirmation?token=aba11d10-1a7c-11e9-8941-01370007468f
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * 		{
 *			"data": {
 *				"_id": "1c40ba61c5fe7020e4f295dd",
 *				"email": "test21@test.com",
 *				"username": "test21",
 *				"roles": [
 *					"User"
 *				],
 *				"confirmed": true,
 *				"token": "eaJhbGciOiJIUzI1NiIsInR5cCI5IkpXVCJ9.eyJfaWQiOiI1YzQwYmE2MmM1ZmU3MDIwZTRmMjk1ZGQiLCJlbWFpbCI6InRlc3QyMUB0ZXN0LmNvbSIsInVzZXJuYW1lIjoidGVzdDIxIiwicm9sZXMiOlsiVXNlciJdLCJjb25maXJtZWQiOnRydWUsImlhdCI6MTU0Nzc0Njc1MSwibmJmIjoxNTQ3NzQ2NzUxLCJleHAiOjE1NjU3NDY3NTEsImF1ZCI6InVuaXF1ZS1jbGllbnQtaWQtaGFzaCA6IElkZW50aWZpZXMgdGhlIHJlY2lwaWVudHMgdGhhdCB0aGUgSldUIGlzIGludGVuZGVkIGZvci4iLCJpc3MiOiJUZW1wbGF0ZSBBUEkiLCJzdWIiOiJzdWJqZWN0In0.Wt2byaWsYHBcTMDXBpzN5qS1MBJcasQ5UlZlTGB67Fs"
 *			}
 *		}
 */
router.get('/confirmation', confirmation)
router.post('/reset_password_request', resetPasswordRequest)
router.post('/reset_password', resetPassword)
router.post('/validate_token', validateToken)
router.post('/RefreshToken', RefreshToken)

module.exports = router
