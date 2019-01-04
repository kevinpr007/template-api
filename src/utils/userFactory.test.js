const userFactory = require('./userFactory')

describe('userFactory.js', () => {
	describe('Test User Factory function', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('userFactory', async () => {
			//Setting
			expect.assertions(11)

			const user = {
				_id: 12345,
				email: 'user@email.com',
				username: 'username',
				roles: 'roles',
				confirmed: true,
			}

			//Check Response
			const result = userFactory(user)
			expect(result._id).toEqual(user._id)
			expect(result.email).toEqual(user.email)
			expect(result.username).toEqual(user.username)
			expect(result.roles).toEqual(user.roles)
			expect(result.confirmed).toEqual(user.confirmed)

			//Check empty values
			const emptyResult = userFactory({})
			expect(emptyResult._id).toEqual(undefined)
			expect(emptyResult.email).toEqual(undefined)
			expect(emptyResult.username).toEqual(undefined)
			expect(emptyResult.roles).toEqual(undefined)
			expect(emptyResult.confirmed).toEqual(undefined)

			//Required variable can't be null
			try {
				userFactory(null)
			} catch (err) {
				expect(err).toBeInstanceOf(Error)
			}
		})
	})
})
