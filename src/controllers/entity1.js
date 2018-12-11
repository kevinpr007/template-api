const Entity1 = require('../models/entity1')
const repository = require('../services/repository')

const getAll = (req, res) => {
	return repository.getAll(req, res, Entity1)
}

const insert = (req, res) => {
	return repository.insert(req, res, Entity1, req.body)
}

const getById = (req, res) => {
	return repository.getById(req, res, Entity1, req.params)
}

const updateById = (req, res) => {
	return repository.updateById(req, res, Entity1, req.params, req.body)
}

const deleteById = (req, res) => {
	return repository.deleteById(req, res, Entity1, req.params)
}

module.exports = {
	getAll,
	insert,
	getById,
	updateById,
	deleteById,
}
