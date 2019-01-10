let objectTest = require('../models/entity2Factory')

describe('Models/entity2Factory.js', () => {
	describe('Test Entity2 Factory function', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('testModel', async () => {
			//Setting
			expect.assertions(5)

			jest.spyOn(objectTest, 'factory')

			let obj = {
				MyString: 'My String',
				MyNumber: '123456789',
				MyDescription: 'My Description',
				Entity1_Id: 'A6-asjgh34-3gdsjf',
			}

			//Start test
			let factory = objectTest.factory(obj)
			expect(objectTest.factory).toHaveBeenCalledTimes(1)

			expect(factory.MyString).toEqual(obj.MyString)
			expect(factory.MyNumber).toEqual(obj.MyNumber)
			expect(factory.MyDescription).toEqual(obj.MyDescription)
			expect(factory.Entity1_Id).toEqual(obj.Entity1_Id)
		})
	})
})
