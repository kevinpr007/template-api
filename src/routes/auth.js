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

/**
 * @api {post} /auth/login Login
 * @apiName /auth/login
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to do a login in the application
 *
 * @apiPermission none
 *
 * @apiHeader {String} Content-Type JSON Format.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          "Content-Type": "application/json"
 *     }
 *
 * @apiParam {String} email		Email registered in the application.
 * @apiParam {String} password	Password used in the account system.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *			"email": "test21@test.com",
 * 			"password": "test21"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * 		{
 *			"data": {
 *				"_id": "1c40ba62c5fa7020e4f295dd",
 *				"email": "test21@test.com",
 *				"username": "test21",
 *				"roles": [
 *					"User"
 *				],
 *				"confirmed": true,
 *				"token": "ayJhbGciOiJIUzI1NiIsInR5cCI7IkpXVCJ9.eyJfaWQiOiI1YzQwYmE2MmM1ZmU8DIwZTRmMjk1ZGQiLCJlbWFpbCI6InRlc3QyMUB0ZXN0LmNvbSIsInVzZXJuYW1lIjoidGVzdDIxIiwicm9sZXMiOlsiVXNlciJdLCJjb25maXJtZWQiOnRydWUsImlhdCI6MTU0Nzc0NzA5MSwibmJmIjoxNTQ3NzQ3MDkxLCJleHAiOjE1NjU3NDcwOTEsImF1ZCI6InVuaXF1ZS1jbGllbnQtaWQtaGFzaCA6IElkZW50aWZpZXMgdGhlIHJlY2lwaWVudHMgdGhhdCB0aGUgSldUIGlzIGludGVuZGVkIGZvci4iLCJpc3MiOiJUZW1wbGF0ZSBBUEkiLCJzdWIiOiJzdWJqZWN0In0.20C8vZjXGI_Z8U66uwAS7ot3QwLsrp8ECaywkj2q0fo"
 *			}
 *		}
 */
router.post('/login', login)

/**
 * @api {get} /auth/confirmation Confirmation
 * @apiName /auth/confirmation
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to validate and activate your email
 *
 * @apiPermission none
 *
 * @apiParam {String} token		This token is send it by the application to your email
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

/**
 * @api {post} /auth/reset_password_request Reset Password Request
 * @apiName /auth/reset_password_request
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to request a reset password for a specific email
 *
 * @apiPermission none
 *
 * @apiParam {String} email		Email used to reset a password
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *			"email": "test21@test.com"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
router.post('/reset_password_request', resetPasswordRequest)

/**
 * @api {post} /auth/reset_password Reset Password
 * @apiName /auth/reset_password
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to reset password and set a new one
 *
 * @apiPermission none
 *
 * @apiHeader {String} Content-Type JSON Format.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          "Content-Type": "application/json"
 *     }
 *
 * @apiParam {String} password	The new password to be use in the application
 * @apiParam {String} token		This token will be used to validate the user in the application
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *			"password": "test210",
 * 			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.ayJfaWQiOiI1YzQwYmE2MmM1ZmU3MDIwZTRmMjk1ZGQiLCJyZXNldFBhc3N3b3JkVG9rZW4iOiI4NzhkOWM3MC0xYTg4LTExZTktYjBkYy05YjIwYTk0NWQ3NzgiLCJpYXQiOjE1NDc3NTA5MzEsIm5iZiI6MTU0Nzc1MDkzMSwiZXhwIjoxNTQ3NzU0NTMxLCJhdWQiOiJ1bmlxdWUtY2xpZW50LWlkLWhhc2ggOiBJZGVudGlmaWVzIHRoZSByZWNpcGllbnRzIHRoYXQgdGhlIEpXVCBpcyBpbnRlbmRlZCBmb3IuIiwiaXNzIjoiVGVtcGxhdGUgQVBJIiwic3ViIjoic3ViamVjdCZ9.2tx7lzlB6CLuQOLtakvZ0SipDPLz7FlkJhuDIAecpz0"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
router.post('/reset_password', resetPassword)

/**
 * @api {post} /auth/validate_token Validate Token
 * @apiName /auth/validate_token
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to validate the actual token
 *
 * @apiPermission none
 *
 * @apiHeader {String} Content-Type JSON Format.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          "Content-Type": "application/json"
 *     }
 *
 * @apiParam {String} token		This token is used to validate the key in the application
 *
 * @apiParamExample {json} Request-Example:
 *     {
 * 			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IypXVCJ8.ayJfaWQiOiI1YzQwYmE2MmM1ZmU3MDIwZTRmMjk1ZGQiLCJyZXNldFBhc3N3b3JkVG9rZW4iOiI4NzhkOWM3MC0xYTg4LTExZTktYjBkYy05YjIwYTk0NWQ3NzgiLCJpYXQiOjE1NDc3NTA5MzEsIm5iZiI6MTU0Nzc1MDkzMSwiZXhwIjoxNTQ3NzU0NTMxLCJhdWQiOiJ1bmlxdWUtY2xpZW50LWlkLWhhc2ggOiBJZGVudGlmaWVzIHRoZSByZWNpcGllbnRzIHRoYXQgdGhlIEpXVCBpcyBpbnRlbmRlZCBmb3IuIiwiaXNzIjoiVGVtcGxhdGUgQVBJIiwic3ViIjoic3ViamVjdCZ9.2tx7lzlB6CLuQOLtakvZ0SipDPLz7FlkJhuDIAecpz0"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
router.post('/validate_token', validateToken)

/**
 * @api {post} /auth/RefreshToken Refresh Token
 * @apiName /auth/RefreshToken
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to refresh the actual token
 *
 * @apiPermission none
 *
 * @apiHeader {String} Content-Type JSON Format.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          "Content-Type": "application/json"
 *     }
 *
 * @apiParam {String} token		This token will be used to validate and send a new token.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 * 			"token": "eyJhbGciOiJAUzI1NiIsInR5cCI6IypXVCJ8.ayJfaWQiOiI1YzQwYmE2MmM1ZmU3MDIwZTRmMjk1ZGQiLCJyZXNldFBhc3N3b3JkVG9rZW4iOiI4NzhkOWM3MC0xYTg4LTExZTktYjBkYy05YjIwYTk0NWQ3NzgiLCJpYXQiOjE1NDc3NTA5MzEsIm5iZiI6MTU0Nzc1MDkzMSwiZXhwIjoxNTQ3NzU0NTMxLCJhdWQiOiJ1bmlxdWUtY2xpZW50LWlkLWhhc2ggOiBJZGVudGlmaWVzIHRoZSByZWNpcGllbnRzIHRoYXQgdGhlIEpXVCBpcyBpbnRlbmRlZCBmb3IuIiwiaXNzIjoiVGVtcGxhdGUgQVBJIiwic3ViIjoic3ViamVjdCZ9.2tx7lzlB6CLuQOLtakvZ1SipDPLz7FlkJhuDIAecpz0"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * 	   X-JWT-Refresh-Token: ayJhbYciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzQwYmE5MmM1ZmU3MDIwZTRmMjk1ZGQiLCJlbWFpbCI6InRlc3QyMUB0ZXN0LmNvbSIsInVzZXJuYW1lIjoidGVzdDIxIiwicm9sZXMiOlsiVXNlciJdLCJjb25maXJtZWQiOnRydWUsImlhdCI6MTU0Nzc1MzE5MywibmJmIjoxNTQ3NzUzMTkzLCJleHAiOjE1NjU3NTMxOTMsImF1ZCI6InVuaXF1ZS1jbGllbnQtaWQtaGFzaCA6IElkZW50aWZpZXMgdGhlIHJlY2lwaWVudHMgdGhhdCB0aGUgSldUIGlzIGludGVuZGVkIGZvci4iLCJpc3MiOiJUZW1wbGF0ZSBBUEkiLCJzdWIiOiJzdWJqZWN0In0.GkLc5xWJ2v2TIZRBbJ4swkE_weuXiF-N_nCprnpIbBM
 *
 */
router.post('/RefreshToken', RefreshToken)

module.exports = router
