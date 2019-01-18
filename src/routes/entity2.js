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
} = require('../controllers/entity2')
const router = express.Router()

router.use(authenticate)
router.use(refreshTokenJWT)
router.use(authorize(USER))

/**
 * @api {get} /entity2/ Get All Entity2 Records
 * @apiName /entity2/
 * @apiGroup Entity2
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to get all records in Entity2
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
 * @apiExample Example usage:
 *     http://localhost/api/entity2?page=1
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 {
    "data": [
        {
            "_id": "1c3f3dad64186320881bf202",
            "MyString": "MyString",
            "MyNumber": 12345,
            "MyDescription": "MyDescription",
            "Entity1_Id": "5c3f3d3068586320881bf209",
            "createdAt": "2019-01-16T14:20:45.453Z",
            "updatedAt": "2019-01-16T14:20:45.453Z",
            "updatedAtPlugin": "2019-01-16T14:20:45.453Z",
            "createdAtPlugin": "2019-01-16T14:20:45.453Z",
            "__v": 0
        }
    ],
    "Pagination": {
        "currentPage": 1,
        "pages": 21,
        "count": 201
    }
}
 */
router.get('/', defaultVariables, getAll)
router.post('/', insert)
router.get('/:id', getById)
router.put('/:id', updateById)
router.delete('/:id', deleteById)

module.exports = router
