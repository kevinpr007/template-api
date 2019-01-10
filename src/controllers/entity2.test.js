const entity2Controller = require('./entity2')
const repository = require('../services/repository')

describe('Controllers/Entity2.js', () => {
	describe('Test Entity2 Controller functions', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('getAll', async () => {
			//Setting
			expect.assertions(3)

			repository.getAll = jest
				.fn()
				.mockImplementationOnce(() => [{ key: 'value' }, 1])
				.mockImplementationOnce(() => {
					throw Error()
				})

			let req = {
				query: {
					page: 1,
					limit: 1,
				},
			}

			let res = {
				json: jest.fn().mockReturnValue({}),
			}

			let next = jest.fn(() => {})

			await entity2Controller.getAll(req, res, next)

			//Start Tests
			expect(repository.getAll).toHaveBeenCalledTimes(1)
			expect(res.json).toHaveBeenCalledTimes(1)

			await entity2Controller.getAll(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
		})

		test('insert', async () => {
			//Setting
			expect.assertions(3)

			repository.insert = jest
				.fn()
				.mockImplementationOnce(() => {
					return { key: 'value' }
				})
				.mockImplementationOnce(() => {
					throw Error()
				})

			let req = {
				body: {
					key: 'value',
				},
			}

			let res = {
				status: jest.fn().mockReturnValue({
					json: jest.fn(),
				}),
			}

			let next = jest.fn(() => {})

			await entity2Controller.insert(req, res, next)

			//Start Tests
			expect(repository.insert).toHaveBeenCalledTimes(1)
			expect(res.status().json).toHaveBeenCalledTimes(1)

			await entity2Controller.insert(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
		})

		test('getById', async () => {
			//Setting
			expect.assertions(3)

			repository.getById = jest
				.fn()
				.mockImplementationOnce(() => {
					return { key: 'value' }
				})
				.mockImplementationOnce(() => {
					throw Error()
				})

			let req = {
				params: {
					key: 'value',
				},
			}

			let res = {
				json: jest.fn().mockReturnValue({}),
			}

			let next = jest.fn(() => {})

			await entity2Controller.getById(req, res, next)

			//Start Tests
			expect(repository.getById).toHaveBeenCalledTimes(1)
			expect(res.json).toHaveBeenCalledTimes(1)

			await entity2Controller.getById(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
		})

		test('updateById', async () => {
			//Setting
			expect.assertions(4)

			repository.updateById = jest
				.fn()
				.mockImplementationOnce(() => {
					return { key: 'value' }
				})
				.mockImplementationOnce(() => null)
				.mockImplementationOnce(() => {
					throw Error()
				})

			let req = {
				body: {
					key: 'value',
				},
				params: 1,
			}

			let res = {
				status: jest.fn().mockReturnValue({
					json: jest.fn(),
				}),
				json: jest.fn().mockReturnValue({}),
			}

			let next = jest.fn(() => {})

			await entity2Controller.updateById(req, res, next)

			//Start Tests
			expect(repository.updateById).toHaveBeenCalledTimes(1)
			expect(res.json).toHaveBeenCalledTimes(1)

			await entity2Controller.updateById(req, res, next)
			expect(res.status().json).toHaveBeenCalledTimes(1)

			await entity2Controller.updateById(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
		})

		test('deleteById', async () => {
			//Setting
			expect.assertions(3)

			repository.deleteById = jest
				.fn()
				.mockImplementationOnce(() => {
					return { key: 'value' }
				})
				.mockImplementationOnce(() => {
					throw Error()
				})

			let req = {
				params: 1,
			}

			let res = {
				json: jest.fn().mockReturnValue({}),
			}

			let next = jest.fn(() => {})

			await entity2Controller.deleteById(req, res, next)

			//Start Tests
			expect(repository.deleteById).toHaveBeenCalledTimes(1)
			expect(res.json).toHaveBeenCalledTimes(1)

			await entity2Controller.deleteById(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
		})
	})
})
