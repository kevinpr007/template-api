const repository = require('./repository')

describe('Repository.js', () => {
	describe('Test repository functions', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('getAll', async () => {
			//Settings
			expect.assertions(6)

			let Entity = {
				find: jest.fn().mockReturnValue({
					skip: jest.fn().mockReturnValue({
						limit: jest.fn().mockReturnValue({
							sort: jest.fn(),
							select: jest.fn(),
							exec: jest.fn(),
						}),
					}),
					count: jest.fn(),
				}),
			}

			let query = {}
			let page = 1
			let limit = 10
			let sort = {}
			let select = {}
			let result = repository.getAll(Entity, query, page, limit, sort, select)

			//Must return a object value
			expect(result).toBeDefined()

			//Check called functions
			expect(Entity.find).toBeCalled()
			//TODO:
			// expect(Entity.find.skip).toBeCalled()
			// expect(Entity.find.skip.limit).toBeCalled()
			// expect(Entity.find.skip.limit.sort).toBeCalled()
			// expect(Entity.find.skip.limit.select).toBeCalled()
			// expect(Entity.find.count).toBeCalled()

			//Required params can't be null
			expect(
				repository.getAll(null, query, page, limit, sort, select)
			).rejects.toBeInstanceOf(Error)
			expect(
				repository.getAll(Entity, null, page, limit, sort, select)
			).rejects.toBeInstanceOf(Error)
			expect(
				repository.getAll(Entity, query, null, limit, sort, select)
			).rejects.toBeInstanceOf(Error)
			expect(
				repository.getAll(Entity, query, page, null, sort, select)
			).rejects.toBeInstanceOf(Error)
		})

		test('insert', async () => {
			//Settings
			expect.assertions(2)

			let data = {}
			let Entity = jest.fn()
			Entity.prototype.save = jest.fn()

			await repository.insert(Entity, data)

			//Check called once
			expect(Entity.prototype.save).toBeCalledTimes(1)

			//Required params can't be null
			expect(repository.insert(null)).rejects.toBeInstanceOf(Error)
		})

		test('getById', async () => {
			//Settings
			expect.assertions(1)

			let Entity = jest.fn(() => {})
			Entity.findById = jest.fn(() => {})
			let data = { id: 1 }

			//Check called once
			await repository.getById(Entity, data)
			expect(Entity.findById).toBeCalledTimes(1)
		})

		test('updateById', async () => {
			//Settings
			expect.assertions(1)

			let Entity = jest.fn(() => {})
			Entity.findByIdAndUpdate = jest.fn(() => {})
			let dataId = { id: 1 }
			let dataToUpdate = {}

			//Check called once
			await repository.updateById(Entity, dataId, dataToUpdate)
			expect(Entity.findByIdAndUpdate).toBeCalledTimes(1)
		})

		test('deleteById', async () => {
			//Settings
			expect.assertions(1)

			let Entity = jest.fn(() => {})
			Entity.findByIdAndRemove = jest.fn(() => {})
			let data = { id: 1 }

			//Check called once
			await repository.deleteById(Entity, data)
			expect(Entity.findByIdAndRemove).toBeCalledTimes(1)
		})
	})
})
