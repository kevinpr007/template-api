const objectTest = require('../utils/globalErrorFactory')

describe('Utils/globalErrorFactory.js', () => {
	describe('Test Global Error Factory function', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('testFunction', async () => {
			//Setting
			expect.assertions(4)

			jest.spyOn(objectTest, 'factory')

			let myMessage = 'My Message'
			let myObject = {
				oldProperty: 'Old',
			}

			//Start test
			let result = objectTest.factory(myMessage, myObject)
			expect(objectTest.factory).toHaveBeenCalledTimes(1)

			expect(result.errors).toBeDefined()
			expect(result.errors.global).toEqual(myMessage)
			expect(result.errors.oldProperty).toEqual(myObject.oldProperty)
		})
	})
})
