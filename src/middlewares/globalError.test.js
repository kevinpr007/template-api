const globalError = require('./globalError')

describe('globalError.js', () => {
	describe('Test Global Error function', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('globalError', async () => {
			//Setting
			expect.assertions(2)

			let err = {
				status: 'Status',
			}
			let req
			let res = {
				status: jest.fn().mockReturnValue({
					json: jest.fn(),
				}),
			}

			let next

			//Check Response
			globalError(err, req, res, next)
			expect(res.status).toHaveBeenCalledTimes(1)
			expect(res.status().json).toHaveBeenCalledTimes(1)
		})
	})
})
