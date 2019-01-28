const express = require('express')
const authenticate = require('../middlewares/authenticate')
const refreshTokenJWT = require('../middlewares/refreshTokenJWT')
const authorize = require('../middlewares/authorize')
const { ADMIN } = require('../utils/constant')
const { addSeed } = require('../controllers/admin')

const router = express.Router()

router.use(authenticate)
router.use(refreshTokenJWT)
router.use(authorize(ADMIN))

/**
 * @api {get} /admin/addSeed Add Seed
 * @apiName /admin/addSeed
 * @apiGroup Admin
 * @apiVersion 1.0.0
 *
 * @apiDescription This route will be used to create all default entities information on the system.
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
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
router.get('/addSeed', addSeed)

module.exports = router
