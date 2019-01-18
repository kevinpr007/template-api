const objectTest = require('../utils/parseErrors')

describe('Utils/parseErrors.js', () => {
	describe('Test Parse Error function', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('testFunction', async () => {
			//Setting
			expect.assertions(6)

			jest.spyOn(objectTest, 'factory')

			let myObject = {
				oldProperty1: { message: 'Old1' },
				oldProperty2: { message: 'Old2' },
				oldProperty3: { message: null },
				oldProperty4: 'Test',
			}

			//Start test
			let result = objectTest.factory(myObject)
			expect(objectTest.factory).toHaveBeenCalledTimes(1)

			expect(result).toBeDefined()
			expect(result.oldProperty1).toEqual(myObject.oldProperty1.message)
			expect(result.oldProperty2).toEqual(myObject.oldProperty2.message)
			expect(result.oldProperty3).toEqual(myObject.oldProperty3)
			expect(result.oldProperty4).toEqual(myObject.oldProperty4)
		})
	})
})
