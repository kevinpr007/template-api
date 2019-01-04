require('dotenv').config()
const JWTVariableFactory = require('./JWTVariableFactory')

describe('JWTVariableFactory.js', () => {
	describe('Test JWT Variable Factory function', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('JWTVariableFactory', async () => {
			//Setting
			expect.assertions(4)

			//Check Response
			const result = JWTVariableFactory
			expect(result).toBeDefined()
			expect(result.audience).toBeDefined()
			expect(result.issuer).toBeDefined()
			expect(result.subject).toBeDefined()
		})
	})
})
