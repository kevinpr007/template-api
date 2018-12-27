const express = require('express')
const authenticate = require('../middlewares/authenticate')
const { signUp } = require('../controllers/users')
const { currentUser } = require('../controllers/auth')
const { addRoleToUser, RemoveRoleFromUser } = require('../controllers/users')
const router = express.Router()

router.post('/SignUp', signUp)
router.get('/current_user', authenticate, currentUser)
router.post('/AddRole', authenticate, addRoleToUser)
router.post('/RemoveRole', authenticate, RemoveRoleFromUser)

module.exports = router
