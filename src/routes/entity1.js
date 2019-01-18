const express = require('express')
const authenticate = require('../middlewares/authenticate')
const defaultVariables = require('../middlewares/defaultVariables')
const refreshTokenJWT = require('../middlewares/refreshTokenJWT')
const authorize = require('../middlewares/authorize')
const { USER } = require('../utils/constant')

const {
	getAll,
	insert,
	getById,
	updateById,
	deleteById,
} = require('../controllers/entity1')
const router = express.Router()

router.use(authenticate)
router.use(refreshTokenJWT)
router.use(authorize(USER))

/**
 * @api {get} /entity1/ Get All Entity1 Records
 * @apiName /entity1/
 * @apiGroup Entity1
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to get all records in Entity1
 *
 * @apiPermission User
 *
 * @apiHeader {String} Content-Type JSON Format.
 * @apiHeader {String} Authorization Token created by the system.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          "Content-Type": "application/json",
 *          "Authorization": "Bearer {TOKEN-XXXXXXX}"
 *     }
 * 
 * @apiParam {Number} page     The page number to get records
 *
 * @apiExample {curl} Example usage:
 *     http://localhost/api/entity1?page=1
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * 		{
 *  		"data": [
 *			{
 *				"_id": "1c3f3ccf6818632a881bf1ff",
 *				"MyField": "MyField",
 *				"MyDescription": "MyDescription",
 *				"MyNumberField": "5456341634",
 *				"createdAt": "2019-01-16T14:16:47.911Z",
 *				"updatedAt": "2019-01-16T14:16:47.911Z",
 *				"updatedAtPlugin": "2019-01-16T14:16:47.911Z",
 *				"createdAtPlugin": "2019-01-16T14:16:47.911Z",
 *				"__v": 0
 *			}
 *			],
 *			"Pagination": {
 *				"currentPage": 1,
 *				"pages": 21,
 *				"count": 201
 *			}
 *		}
 */
router.get('/', defaultVariables, getAll)
router.post('/', insert)
router.get('/:id', getById)
router.put('/:id', updateById)
router.delete('/:id', deleteById)

module.exports = router
