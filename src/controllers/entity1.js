const HttpStatus = require('http-status-codes')
const globalErrorFactory = require('../utils/globalErrorFactory')
const setDataFactory = require('../utils/setDataFactory')
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

	let data = setDataFactory('data', allRecords)
	let pagination = paginationFactory(req.query.page, count, req.query.limit)
	data = setDataFactory('Pagination', pagination, data)

	res.json(data)
}

const insert = async (req, res, next) => {
	const entityToInsert = entityFactory(req.body)

	try {
		const entityRecord = await repository.insert(Entity1, entityToInsert)
		const data = setDataFactory('data', entityRecord)
		res.status(HttpStatus.CREATED).json(data)
	} catch (err) {
		next(err)
	}
}

const getById = async (req, res) => {
	const record = await repository.getById(Entity1, req.params)
	const data = setDataFactory('data', record)
	res.json(data)
}

const updateById = async (req, res) => {
	const entityToUpdate = entityFactory(req.body)

	let record = await repository.updateById(Entity1, req.params, entityToUpdate)

	if (record) {
		let data = setDataFactory('data', record)
		res.json(data)
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
