let objectTest = require('../models/entity1Factory')

describe('Models/entity1Factory.js', () => {
	describe('Test Entity1 Factory function', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('testModel', async () => {
			//Setting
			expect.assertions(4)

			jest.spyOn(objectTest, 'factory')

			let obj = {
				MyField: 'My Field',
				MyDescription: 'Description',
				MyNumberField: '12345',
			}

			//Start test
			let factory = objectTest.factory(obj)
			expect(objectTest.factory).toHaveBeenCalledTimes(1)

			expect(factory.MyField).toEqual(obj.MyField)
			expect(factory.MyDescription).toEqual(obj.MyDescription)
			expect(factory.MyNumberField).toEqual(obj.MyNumberField)
		})
	})
})
