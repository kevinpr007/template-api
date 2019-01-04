require('dotenv').config()
const signJWT = require('./signJWT')

describe('signJWT.js', () => {
	describe('Test Sign JWT function', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('signJWT', async () => {
			//Setting
			expect.assertions(5)

			//Check Response
			expect(signJWT.expiresIn).toBeDefined()
			expect(signJWT.notBefore).toBeDefined()
			expect(signJWT.audience).toBeDefined()
			expect(signJWT.issuer).toBeDefined()
			expect(signJWT.subject).toBeDefined()
		})
	})
})
