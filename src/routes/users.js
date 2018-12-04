const express = require('express')
const HttpStatus = require('http-status-codes')
const User = require('../models/User')
const parseErrors = require('../utils/parseErrors')
const globalError = require('../utils/globalError')
const { sendConfirmationEmailValidation } = require('../utils/mailer')
const authenticate = require('../middlewares/authenticate')
const userFactory = require('../utils/userFactory')

const router = express.Router()

//TODO:Add Controllers
//TODO:Add Sign Up
router.post('/', (req, res) => {
	const { email, password, username } = req.body.user

	const user = new User({ email, username })
	if (user.isPasswordLength(password)) {
		user.setPassword(password)
		user.setConfirmationToken()
		//TODO:ASYNC AWAY
		user
			.save()
			.then((userRecord) => {
				sendConfirmationEmailValidation(userRecord)
				res.json({ user: userRecord.toAuthJSON() })
			})
			.catch((err) =>
				res
					.status(HttpStatus.BAD_REQUEST)
					.json(globalError('Error saving User', parseErrors(err.errors)))
			)
	} else {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(
				globalError(
					`You have entered less than ${
						process.env.PASSWORD_LENGTH
					} characters for password`
				)
			)
	}
})

router.get('/current_user', authenticate, (req, res) => {
	res.json({
		user: userFactory(req.currentUser),
	})
})

module.exports = router
