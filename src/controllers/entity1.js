const Entity1 = require('../models/entity1')
const repository = require('../services/repository')

//TODO: Apply response from service in controller
const getAll = (req, res) => {
	return repository.getAll(res, Entity1)
}

const insert = (req, res) => {
	return repository.insert(res, Entity1, req.body)
}

const getById = (req, res) => {
	return repository.getById(res, Entity1, req.params)
}

const updateById = (req, res) => {
	return repository.updateById(res, Entity1, req.params, req.body)
}

const deleteById = (req, res) => {
	return repository.deleteById(res, Entity1, req.params)
}

module.exports = {
	getAll,
	insert,
	getById,
	updateById,
	deleteById,
}
