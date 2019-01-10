const jwt = require('jsonwebtoken')
const jwtService = require('./jwtService')

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

			jwt.verify = jest.fn(() => 'Token-12345')
			jwtService.verify('user')

			//Start Tests
			expect(jwt.verify).toHaveBeenCalledTimes(1)

			//Required variable can't be null
			try {
				jwtService.verify(null)
			} catch (err) {
				expect(err).toBeInstanceOf(Error)
			}
		})
	})
})
