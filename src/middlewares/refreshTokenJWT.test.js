require('dotenv').config()

const refreshTokenJWT = require('./refreshTokenJWT')
const jwtService = require('../services/jwtService')

describe('refreshTokenJWT.js', () => {
	describe('Test Refresh Token JWT function', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('refreshTokenJWT', async () => {
			//Setting
			expect.assertions(2)
			jwtService.sign = jest.fn(() => {})

			let req = {
				decodedToken: {
					exp: 265000,
				},
			}

			let res = {
				set: jest.fn().mockReturnValue({}),
			}

			let next = jest.fn()

			//Check Response
			refreshTokenJWT(req, res, next)
			expect(res.set).toHaveBeenCalledTimes(1)
			expect(jwtService.sign).toHaveBeenCalledTimes(1)
		})
	})
})
