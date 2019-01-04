require('dotenv').config()

const defaultVariables = require('./defaultVariables')

describe('defaultVariables.js', () => {
	describe('Test default variable function', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('defaultVariables', async () => {
			//Setting
			expect.assertions(2)

			let req = {
				query: {
					page: 2,
				},
			}
			let res
			let next = jest.fn()

			//Check Response
			defaultVariables(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)

			req.query.page = 'a'
			let secondNext = (err) => {
				if (err) {
					expect(err).toBeInstanceOf(Error)
				}
			}
			defaultVariables(req, res, secondNext)
		})
	})
})
