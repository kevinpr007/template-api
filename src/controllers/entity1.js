const HttpStatus = require('http-status-codes')
const parseErrors = require('../utils/parseErrors')
const globalErrorFactory = require('../utils/globalErrorFactory')
const setResponse = require('../utils/setResponse')
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

	//TODO: Mix with Set Response
	let response = responseRepositoryFactory(Entity1.modelName, allRecords)
	let pagination = paginationFactory(req.query.page, count, req.query.limit)

	response = responseRepositoryFactory('Pagination', pagination, response)
	res.json(setResponse(response))
}

const insert = async (req, res) => {
	const entityToInsert = entityFactory(req.body)

	try {
		const entityRecord = await repository.insert(Entity1, entityToInsert)
		const response = responseRepositoryFactory(Entity1.modelName, entityRecord)
		res.status(HttpStatus.CREATED).json(setResponse(response))
	} catch (err) {
		next(err)
	}
}

const getById = async (req, res) => {
	const record = await repository.getById(Entity1, req.params)
	const response = responseRepositoryFactory(Entity1.modelName, record)
	res.json(setResponse(response))
}

const updateById = async (req, res) => {
	const entityToUpdate = entityFactory(req.body)

	let record = await repository.updateById(Entity1, req.params, entityToUpdate)

	if (record) {
		let response = responseRepositoryFactory(Entity1.modelName, record)
		res.json(setResponse(response))
	} else {
		res
			.status(HttpStatus.NOT_FOUND)
			.json(globalErrorFactory('Record not found.'))
		//TODO: https://stackoverflow.com/questions/2342579/http-status-code-for-update-and-delete
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
