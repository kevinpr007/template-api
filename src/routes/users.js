const express = require('express')
const authenticate = require('../middlewares/authenticate')
const { signUp } = require('../controllers/users')
const { currentUser } = require('../controllers/auth')
const { addRoleToUser, RemoveRoleFromUser } = require('../controllers/users')

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
 *      {
 *           "data": {
 *              "_id": "8c40ba62c5fe7020e4f295dd",
 *              "email": "test21@test.com",
 *              "username": "test21",
 *              "roles": [
 *                  "User",
 *                  "Admin"
 *              ],
 *              "confirmed": true
 *          }
 *      }
 *
 */
router.post('/AddRole', authenticate, addRoleToUser)

/**
 * @api {post} /users/RemoveRole Remove Role
 * @apiName /users/RemoveRole
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to remove a role from the user
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
 *      {
 *           "data": {
 *               "_id": "9c40ba62c5fe7020e4f295dd",
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
router.post('/RemoveRole', authenticate, RemoveRoleFromUser)

module.exports = router
