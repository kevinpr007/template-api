const setDataFactory = require('./setDataFactory')

describe('setDataFactory.js', () => {
	describe('Test  Set Data Factory function', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('setDataFactory', async () => {
			//Setting
			expect.assertions(4)

			const key = 'data'
			let object = {
				testKey: 'testValue',
			}
			let secondObject = {
				secondKey: 'secondValue',
			}

			//Check Response
			const result = setDataFactory(key, object)
			expect(result.data).toBeDefined()
			expect(result.data.testKey).toEqual(object.testKey)

			const composeResult = setDataFactory('newData', secondObject, result)
			expect(composeResult.data).toBeDefined()
			expect(composeResult.newData.secondKey).toEqual(secondObject.secondKey)
		})
	})
})
