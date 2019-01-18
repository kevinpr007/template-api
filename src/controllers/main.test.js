const mainController = require('./main')

describe('Controllers/main.js', () => {
	describe('Test Main Controller functions', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('MainPage', async () => {
			//Setting
			expect.assertions(4)

			jest.spyOn(mainController, 'MainPage')

			let req
			let res = {
				sendFile: jest.fn(),
			}

			let next = jest.fn(() => {})

			//Start test
			mainController.MainPage(req, res, next)
			expect(mainController.MainPage).toHaveBeenCalledTimes(1)
			expect(res.sendFile).toHaveBeenCalledTimes(1)

			res = jest.fn().mockReturnValue(() => {
				throw Error()
			})

			mainController.MainPage(req, res, next)
			expect(mainController.MainPage).toHaveBeenCalledTimes(2)
			expect(next).toHaveBeenCalledTimes(1)
		})

		test('apiDoc', async () => {
			//Setting
			expect.assertions(4)

			jest.spyOn(mainController, 'apiDoc')

			let req
			let res = {
				sendFile: jest.fn(),
			}

			let next = jest.fn(() => {})

			//Start test
			mainController.apiDoc(req, res, next)
			expect(mainController.apiDoc).toHaveBeenCalledTimes(1)
			expect(res.sendFile).toHaveBeenCalledTimes(1)

			res = jest.fn().mockReturnValue(() => {
				throw Error()
			})

			mainController.apiDoc(req, res, next)
			expect(mainController.apiDoc).toHaveBeenCalledTimes(2)
			expect(next).toHaveBeenCalledTimes(1)
		})
	})
})
