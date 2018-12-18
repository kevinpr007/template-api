const express = require('express')
const authenticate = require('../middlewares/authenticate')
const pagination = require('../middlewares/pagination')

const {
	getAll,
	insert,
	getById,
	updateById,
	deleteById,
} = require('../controllers/entity1')
const router = express.Router()

router.use(authenticate)

router.get('/', pagination, getAll)
router.post('/', insert)
router.get('/:id', getById)
router.put('/:id', updateById)
router.delete('/:id', deleteById)

module.exports = router
