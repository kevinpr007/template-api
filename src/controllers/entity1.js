const HttpStatus = require('http-status-codes')
const Entity1 = require('../models/entity1')
const parseErrors = require('../utils/parseErrors')
const globalError = require('../utils/globalError')
const setData = require('../utils/composeResponse')
const repository = require('../services/repository')

//TODO: Add in service
const getAll = (req, res) => {
	return repository.getAll(req, res, Entity1)
}

const insert = (req, res) => {
	//TODO: Send just req.body and not req.body.entity1
	return repository.insert(req, res, Entity1, req.body.entity1)
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
