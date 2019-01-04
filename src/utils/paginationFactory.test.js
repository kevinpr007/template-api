const paginationFactory = require('./paginationFactory')

describe('paginationFactory.js', () => {
	describe('Test Pagination Factory function', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('paginationFactory', async () => {
			//Setting
			expect.assertions(4)

			const page = 5
			const count = 1250
			const limit = 50

			//Check Response
			const result = paginationFactory(page, count, limit)
			expect(result).toBeDefined()
			expect(result.currentPage).toEqual(page)
			expect(result.pages).toBeDefined()
			expect(result.count).toEqual(count)
		})
	})
})
