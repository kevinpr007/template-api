const express = require('express')
const authenticate = require('../middlewares/authenticate')
const { signUp } = require('../controllers/users')
const { currentUser } = require('../controllers/auth')
const { addRoleToUser, RemoveRoleFromUser } = require('../controllers/users')
const authorize = require('../middlewares/authorize')
const { ADMIN } = require('../utils/constant')

const router = express.Router()

/**
 * @api {post} /users/SignUp Sign Up
 * @apiName /users/SignUp
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used for create users on the system.
 *
 * @apiPermission none
 *
 * @apiHeader {String} Content-Type JSON Format.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *          "Content-Type": "application/json"
 *     }
 *
 * @apiParam {String} email     Email used in the system as primary key.
 * @apiParam {String} password  Password required on the system.
 * @apiParam {String} username  Username used in the system.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *          "email": "test21@test.com",
 *          "password":"test21",
 *          "username":"test21"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 *      {
 *          "data": {
 *              "_id": "1c40ba62c5fe7020e4f295dd",
 *              "email": "test21@test.com",
 *              "username": "test21",
 *              "roles": [
 *                  "User"
 *              ],
 *              "confirmed": false,
 *              "token": "ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzQwYmE2MmM1ZmU3MDIwZTRmMjk1ZGQiLCJlbWFpbCI6InRlc3QyMUB0ZXN0LmNvbSIsInVzZXJuYW1lIjoidGVzdDIxIiwicm9sZXMiOlsiVXNlciJdLCJjb25maXJtZWQiOmZhbHNlLCJpYXQiOjE1NDc3NDU4OTEsIm5iZiI6MTU0Nzc0NTg5MSwiZXhwIjoxNTY1NzQ1ODkxLCJhdWQiOiJ1bmlxdWUtY2xpZW50LWlkLWhhc2ggOiBJZGVudGlmaWVzIHRoZSByZWNpcGllbnRzIHRoYXQgdGhlIEpXVCBpcyBpbnRlbmRlZCBmb3IuIiwiaXNzIjoiVGVtcGxhdGUgQVBJIiwic3ViIjoic3ViamVjdCJ9.dkKr9l975JymZ-ejw6UC8pJjBllRd58jj8GD_etC1aU"
 *          }
 *      }
 */
router.post('/SignUp', signUp)

/**
 * @api {get} /users/current_user Get a Current User
 * @apiName /users/current_user
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to get the current user inside the token.
 *
 * @apiPermission none
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
 * @apiExample Example usage:
 *     http://localhost/api/users/current_user
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 *      {
 *            "data": {
 *              "_id": "1c40ba62c5fe7020e4f295dd",
 *              "email": "test21@test.com",
 *              "username": "test21",
 *              "roles": [
 *                  "User"
 *              ],
 *              "confirmed": true
 *          }
 *      }
 *
 */
router.get('/current_user', authenticate, currentUser)

/**
 * @api {post} /users/AddRole Add Role
 * @apiName /users/AddRole
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to add a new role to an user
 *
 * @apiPermission Admin
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
 * @apiParam {String} userId    UserId  The user ID to assign the new role
 * @apiParam {String} role      Role    The role to be added to an user
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *          "userId": "3c3f346f54045a240c4ae427",
 *	        "role":"Admin"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 {
    "data": {
        "_id": "5c421b41abd0630fc834b397",
        "email": "test21@test.com",
        "username": "test21",
        "roles": [
            "User",
            "Admin"
        ],
        "confirmed": true,
        "token": "eaJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzQyMGI0MWFiZDA2MzBmYzgzNGIzOTciLCJlbWFpbCI6InRlc3QyMUB0ZXN0LmNvbSIsInVzZXJuYW1lIjoidGVzdDIxIiwicm9sZXMiOlsiVXNlciIsIkFkbWluIl0sImNvbmZpcm1lZCI6dHJ1ZSwiaWF0IjoxNTQ3ODM0NDE4LCJuYmYiOjE1NDc4MzQ0MTgsImV4cCI6MTU2NTgzNDQxOCwiYXVkIjoidW5pcXVlLWNsaWVudC1pZC1oYXNoIDogSWRlbnRpZmllcyB0aGUgcmVjaXBpZW50cyB0aGF0IHRoZSBKV1QgaXMgaW50ZW5kZWQgZm9yLiIsImlzcyI6IlRlbXBsYXRlIEFQSSIsInN1YiI6InN1YmplY3QifQ.5dDvqMejuZcYQ4VBkoQmzCHCozPdxMivybjutrHoy0A"
    }
}
 *
 */
router.post('/AddRole', authenticate, authorize(ADMIN), addRoleToUser)

/**
 * @api {post} /users/RemoveRole Remove Role
 * @apiName /users/RemoveRole
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to remove a role from the user
 *
 * @apiPermission Admin
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
 * @apiParam {String} userId    UserId  The user ID to remove the role
 * @apiParam {String} role      Role    The role to be removed from the user
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *          "userId": "3c3f346f54045a240c4ae427",
 *	        "role":"Admin"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
{
    "data": {
        "_id": "1c420b41abd0630fc834b397",
        "email": "test21@test.com",
        "username": "test21",
        "roles": [
            "User"
        ],
        "confirmed": true,
        "token": "eyJhbGciOi4IUzI1NiIaInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzQyMGI0MWFiZDA2MzBmYzgzNGIzOTciLCJlbWFpbCI6InRlc3QyMUB0ZXN0LmNvbSIsInVzZXJuYW1lIjoidGVzdDIxIiwicm9sZXMiOlsiVXNlciJdLCJjb25maXJtZWQiOnRydWUsImlhdCI6MTU0NzgzNDQ0MywibmJmIjoxNTQ3ODM0NDQzLCJleHAiOjE1NjU4MzQ0NDMsImF1ZCI6InVuaXF1ZS1jbGllbnQtaWQtaGFzaCA6IElkZW50aWZpZXMgdGhlIHJlY2lwaWVudHMgdGhhdCB0aGUgSldUIGlzIGludGVuZGVkIGZvci4iLCJpc3MiOiJUZW1wbGF0ZSBBUEkiLCJzdWIiOiJzdWJqZWN0In0.si9lsKxck_ea6XZbwCSO2mqim5IniSctIQcTnHFGe3g"
    }
}
 *
 */
router.post('/RemoveRole', authenticate, authorize(ADMIN), RemoveRoleFromUser)

module.exports = router
