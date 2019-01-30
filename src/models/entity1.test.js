//TODO:
// let Entity1 = require('../models/Entity1')
// // const userController = require('../controllers/users')

// // jest.mock('../utils/email/mailer', () => {
// //     return {
// //         sendConfirmationEmailValidation: jest.fn().mockReturnValue(true),
// //     }
// // })

// describe('Models/Entity1.js', () => {
// 	describe('Test Entity1 model', () => {
// 		beforeEach(() => {
// 			jest.resetModules()
// 		})

// 		test('testModel', async () => {
// 			//Setting
// 			expect.assertions(5)

// 			let obj = {
// 				MyField: 'My Field',
// 				MyDescription: 'Description',
// 				MyNumberField: '12345',
// 			}

// 			let model = new Entity1({
// 				MyField: 'obj.MyField',
// 			})
// 			model.MyDescription = obj.MyDescription
// 			model.MyNumberField = obj.MyNumberField

// 			// jest.spyOn(userController, 'addRoleToUser')

// 			//Start test
// 			expect(model.MyField).toEqual(obj.MyField)
// 			expect(model.MyDescription).toEqual(obj.MyDescription)
// 			expect(model.MyNumberField).toEqual(obj.MyNumberField)
// 			expect(model.testVirtual).toEqual(`${obj.MyField} ${obj.MyDescription}`)
// 			expect(model.testVirtual.set('Name Test')).toEqual(`Name Test`)

// 			// await userController.addRoleToUser(req, res, next)
// 			// expect(userController.addRoleToUser).toHaveBeenCalledTimes(1)
// 			// expect(res.json).toHaveBeenCalledTimes(1)

// 			// await userController.addRoleToUser(req, res, next)
// 			// expect(res.status().json).toHaveBeenCalledTimes(1)

// 			// req.body.role = 'Unknown'
// 			// await userController.addRoleToUser(req, res, next)
// 			// expect(res.status().json).toHaveBeenCalledTimes(2)

// 			// req = ''
// 			// await userController.addRoleToUser(req, res, next)
// 			// expect(next).toHaveBeenCalledTimes(1)
// 		})
// 	})
// })
