const HttpStatus = require('http-status-codes')
const parseErrors = require('../utils/parseErrors')
const globalErrorFactory = require('../utils/globalErrorFactory')
const setData = require('../utils/composeResponse')
const responseRepositoryFactory = require('../utils/responseRepositoryFactory')
const Entity1 = require('../models/entity1')
const repository = require('../services/repository')
const entityFactory = require('../models/entityFactory')
const paginationFactory = require('../utils/paginationFactory')

const getAll = async (req, res) => {
	const [allRecords, count] = await repository.getAll(
		Entity1,
		{},
		req.query.page,
		req.query.limit
	)

	let response = responseRepositoryFactory(Entity1.modelName, allRecords)
	let pagination = paginationFactory(req.query.page, count, req.query.limit)

	response = responseRepositoryFactory('Pagination', pagination, response)
	res.json(setData(response))
}

const insert = async (req, res) => {
	const entityToInsert = entityFactory(req.body)

	try {
		const entityRecord = await repository.insert(Entity1, entityToInsert)
		const response = responseRepositoryFactory(Entity1.modelName, entityRecord)
		res.status(HttpStatus.CREATED).json(setData(response))
	} catch (err) {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalErrorFactory('Error saving data', parseErrors(err.errors)))
	}
}

const getById = async (req, res) => {
	const record = await repository.getById(Entity1, req.params)
	const response = responseRepositoryFactory(Entity1.modelName, record)
	res.json(setData(response))
}

const updateById = async (req, res) => {
	const entityToUpdate = entityFactory(req.body.data)

	let record = await repository.updateById(Entity1, req.params, entityToUpdate)

	if (record) {
		let response = responseRepositoryFactory(Entity1.modelName, record)
		res.json(setData(response))
	} else {
		res
			.status(HttpStatus.NOT_FOUND)
			.json(globalErrorFactory('Record not found.'))
	}
}

const deleteById = async (req, res) => {
	await repository.deleteById(Entity1, req.params)
	res.json()
}

module.exports = {
	getAll,
	insert,
	getById,
	updateById,
	deleteById,
}
