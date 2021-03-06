const HttpStatus = require('http-status-codes')
const globalErrorFactory = require('../utils/globalErrorFactory')
const setDataFactory = require('../utils/setDataFactory')
const Entity1 = require('../models/entity1')
const repository = require('../services/repository')
const entity1Factory = require('../models/entity1Factory')
const paginationFactory = require('../utils/paginationFactory')
const { ERROR_RECORD_NOT_FOUND } = require('../utils/constant')

const getAll = async (req, res, next) => {
	try {
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
	} catch (err) {
		next(err)
	}
}

const insert = async (req, res, next) => {
	try {
		const entityToInsert = entity1Factory.factory(req.body)
		const entityRecord = await repository.insert(Entity1, entityToInsert)
		const data = setDataFactory('data', entityRecord)
		res.status(HttpStatus.CREATED).json(data)
	} catch (err) {
		next(err)
	}
}

const getById = async (req, res, next) => {
	try {
		const record = await repository.getById(Entity1, req.params)
		const data = setDataFactory('data', record)
		res.json(data)
	} catch (err) {
		next(err)
	}
}

const updateById = async (req, res, next) => {
	try {
		const entityToUpdate = entity1Factory.factory(req.body)

		let record = await repository.updateById(
			Entity1,
			req.params,
			entityToUpdate
		)

		if (record) {
			let data = setDataFactory('data', record)
			res.json(data)
		} else {
			res
				.status(HttpStatus.NOT_FOUND)
				.json(globalErrorFactory.factory(ERROR_RECORD_NOT_FOUND))
		}
	} catch (err) {
		next(err)
	}
}

const deleteById = async (req, res, next) => {
	try {
		await repository.deleteById(Entity1, req.params)
		res.json()
	} catch (err) {
		next(err)
	}
}

module.exports = {
	getAll,
	insert,
	getById,
	updateById,
	deleteById,
}
