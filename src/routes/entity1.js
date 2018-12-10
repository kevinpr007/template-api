const express = require('express')
const authenticate = require('../middlewares/authenticate')
const {
	getAll,
	insert,
	getById,
	updateById,
	deleteById,
} = require('../controllers/entity1')
const router = express.Router()

//TODO: Authenticate Use
router.get('/', authenticate, getAll)
router.post('/', authenticate, insert)
router.get('/getById', authenticate, getById)
router.put('/', authenticate, updateById)
router.delete('/', authenticate, deleteById)

module.exports = router
