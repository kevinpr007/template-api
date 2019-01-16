const authorize = require('./authorize')

describe('authorize.js', () => {
	describe('Test authorize function', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('authorize', async () => {
			//Setting
			expect.assertions(2)

			let roles = 'Admin'
			let req = {
				currentUser: {
					roles: ['Admin'],
				},
			}
			let res
			let next = jest.fn()

			//Check Response
			let response = authorize(roles)
			response(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)

			req.currentUser.roles = 'OTHER_ROLE'
			res = {
				status: jest.fn().mockReturnValue({
					json: jest.fn(),
				}),
			}
			response(req, res, next)
			expect(res.status().json).toHaveBeenCalledTimes(1)
		})
	})
})
