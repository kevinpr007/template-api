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

//TODO:
//router.use(authenticate)

router.get('/', getAll)
router.post('/', insert)
router.get('/:id', getById)
router.put('/:id', updateById)
router.delete('/:id', deleteById)

module.exports = router
