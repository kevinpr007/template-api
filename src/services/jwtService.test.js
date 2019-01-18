require('dotenv').config()
const jwt = require('jsonwebtoken')
let jwtService = require('./jwtService')

describe('jwtService.js', () => {
	describe('Test jwt service functions', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('sign', async () => {
			//Setting
			expect.assertions(2)

			jwt.sign = jest.fn(() => 'Token-12345')
			jwtService.sign('user')

			//Start Tests
			expect(jwt.sign).toHaveBeenCalledTimes(1)

			//Required variable can't be null
			try {
				jwtService.sign(null)
			} catch (err) {
				expect(err).toBeInstanceOf(Error)
			}
		})

		test('ResetPasswordSign', async () => {
			//Setting
			expect.assertions(2)

			jwt.sign = jest.fn(() => 'Token-12345')
			jwtService.ResetPasswordSign('user')

			//Start Tests
			expect(jwt.sign).toHaveBeenCalledTimes(1)

			//Required variable can't be null
			try {
				jwtService.ResetPasswordSign(null)
			} catch (err) {
				expect(err).toBeInstanceOf(Error)
			}
		})

		test('verify', async () => {
			//Setting
			expect.assertions(2)

			jwtService = require('./jwtService')
			let realToken = jwtService.sign({ _id: 12345, username: 'My User Name' })

			//Start Tests
			try {
				let result = jwtService.verify(realToken)
				expect(result).toBeDefined()
				jwtService.verify(null)
			} catch (err) {
				expect(err).toBeInstanceOf(Error)
			}
		})
	})
})
