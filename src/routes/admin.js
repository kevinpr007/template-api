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

router.get('/addSeed', addSeed)

module.exports = router
