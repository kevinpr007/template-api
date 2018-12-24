const HttpStatus = require('http-status-codes')
const globalErrorFactory = require('../utils/globalErrorFactory')
const setDataFactory = require('../utils/setDataFactory')
const Entity2 = require('../models/entity2')
const repository = require('../services/repository')
const entity2Factory = require('../models/entity2Factory')
const paginationFactory = require('../utils/paginationFactory')
const { ERROR_RECORD_NOT_FOUND } = require('../utils/constant')

const getAll = async (req, res) => {
	const [allRecords, count] = await repository.getAll(
		Entity2,
		{},
		req.query.page,
		req.query.limit
	)

	let data = setDataFactory('data', allRecords)
	let pagination = paginationFactory(req.query.page, count, req.query.limit)
	data = setDataFactory('Pagination', pagination, data)

	res.json(data)
}

const insert = async (req, res, next) => {
	const entityToInsert = entity2Factory(req.body)

	try {
		const entityRecord = await repository.insert(Entity2, entityToInsert)
		const data = setDataFactory('data', entityRecord)

		res.status(HttpStatus.CREATED).json(data)
	} catch (err) {
		next(err)
	}
}

const getById = async (req, res) => {
	const record = await repository.getById(Entity2, req.params)
	const data = setDataFactory('data', record)
	res.json(data)
}

const updateById = async (req, res) => {
	const entityToUpdate = entity2Factory(req.body)

	let record = await repository.updateById(Entity2, req.params, entityToUpdate)

	if (record) {
		let data = setDataFactory('data', record)
		res.json(data)
	} else {
		res
			.status(HttpStatus.NOT_FOUND)
			.json(globalErrorFactory(ERROR_RECORD_NOT_FOUND))
	}
}

const deleteById = async (req, res) => {
	await repository.deleteById(Entity2, req.params)
	res.json()
}

module.exports = {
	getAll,
	insert,
	getById,
	updateById,
	deleteById,
}
