const jwtService = require('../services/jwtService')
const authenticate = require('./authenticate')

describe('authenticate.js', () => {
	describe('Test authenticate function', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('authenticate', async () => {
			//Setting
			expect.assertions(4)

			let req = {
				headers: {
					authorization: 'Test Token12345',
				},
			}
			let res = {
				status: jest.fn().mockReturnValue({
					json: jest.fn(),
				}),
			}

			let next = jest.fn()
			jwtService.verify = jest
				.fn()
				.mockReturnValueOnce([Error('Error'), null])
				.mockReturnValueOnce([null, { confirmed: false }])
				.mockReturnValueOnce([null, { confirmed: true }])

			//Check Response
			authenticate(req, res, next)
			expect(res.status().json).toHaveBeenCalledTimes(1)
			authenticate(req, res, next)
			expect(res.status().json).toHaveBeenCalledTimes(2)
			authenticate(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)

			req = {
				headers: {
					authorization: 'Test',
				},
			}

			authenticate(req, res, next)
			expect(res.status().json).toHaveBeenCalledTimes(3)
		})
	})
})
