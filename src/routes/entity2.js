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

/**
 * @api {post} /entity2 Insert a new Entity2 record 
 * @apiName /entity2/post
 * @apiGroup Entity2
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to insert a record in Entity2
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
 * @apiParam {String} MyString     The field to be inserted with the new value
 * @apiParam {String} MyNumber     The field to be inserted with the new value
 * @apiParam {String} MyDescription     The field to be inserted with the new value
 * @apiParam {String} Entity1_Id     The field to be inserted with the new value
 *
 * @apiParamExample {json} Request-Example:
{
    "MyString": "MyString",
    "MyNumber": 12345,
    "MyDescription": "MyDescription",
    "Entity1_Id": "5c3f3d3068186320881bf209"
}
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 {
    "data": {
        "_id": "1c41ed9v01496s3680b8ceba",
        "MyString": "MyString",
        "MyNumber": 12345,
        "MyDescription": "MyDescription",
        "Entity1_Id": "8c3a3d3060186320881bf201",
        "createdAt": "2019-01-18T15:15:43.802Z",
        "updatedAt": "2019-01-18T15:15:43.802Z",
        "updatedAtPlugin": "2019-01-18T15:15:43.802Z",
        "createdAtPlugin": "2019-01-18T15:15:43.802Z",
        "__v": 0
    }
}
 */
router.post('/', insert)

/**
 * @api {get} /entity2/:id Search Entity2 by Id
 * @apiName /entity2/:id-Get
 * @apiGroup Entity2
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to get a record of Entity2 by Id
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
 * @apiParam {Number} id     The Id of the record
 *
 * @apiExample Example usage:
 *     http://localhost/api/entity2/1c41ed9f01496b3680b8ceba
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
{
    "data": {
        "_id": "1c41ed9f01496b3680b8ceba",
        "MyString": "MyString",
        "MyNumber": 12345,
        "MyDescription": "MyDescription",
        "Entity1_Id": "ac3f3d3068126320881bc209",
        "createdAt": "2019-01-18T15:15:43.802Z",
        "updatedAt": "2019-01-18T15:15:43.802Z",
        "updatedAtPlugin": "2019-01-18T15:15:43.802Z",
        "createdAtPlugin": "2019-01-18T15:15:43.802Z",
        "__v": 0
    }
}
 */
router.get('/:id', getById)

/**
 * @api {put} /entity2/:id Update Entity2 by Id
 * @apiName /entity2/:id-Put
 * @apiGroup Entity2
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to update a record of Entity2 by Id
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
 * @apiParam {Number} id     The Id of the record
 * @apiParam {String} MyString     The field to be update with the new value
 * @apiParam {String} MyNumber     The field to be update with the new value
 * @apiParam {String} MyDescription     The field to be update with the new value
 * @apiParam {String} Entity1_Id     The field to be update with the new value
 * 
 * @apiExample Example usage:
 *     http://localhost:3000/api/entity2/1c41ed9f01496b3680b8ceba
 *
 * @apiParamExample {json} Request-Example:
 {
    "MyString": "MyString_EDITEDDDDDD",
    "MyNumber": 12345,
    "MyDescription": "MyDescription_EDITED",
    "Entity1_Id": "1c20a272c1vd536fa0c3d055"
}
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 {
    "data": {
        "_id": "1c41ed9f01496b3680b8ceba",
        "MyString": "MyString_EDITEDDDDDD",
        "MyNumber": 12345,
        "MyDescription": "MyDescription_EDITED",
        "Entity1_Id": "1c20a272c1vd536fa0c3d055",
        "createdAt": "2019-01-18T15:15:43.802Z",
        "updatedAt": "2019-01-18T15:25:53.822Z",
        "updatedAtPlugin": "2019-01-18T15:15:43.802Z",
        "createdAtPlugin": "2019-01-18T15:15:43.802Z",
        "__v": 0
    }
}
 */
router.put('/:id', updateById)

/**
 * @api {delete} /entity2/:id Delete Entity2 by Id
 * @apiName /entity2/:id-Delete
 * @apiGroup Entity2
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to delete a record of Entity2 by Id
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
 * @apiParam {Number} id     The Id of the record
 *
 * @apiExample Example usage:
 *     http://localhost/api/entity2/1c41ed9f01496b3680b8ceba
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
router.delete('/:id', deleteById)

module.exports = router
