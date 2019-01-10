const HttpStatus = require('http-status-codes')
const globalErrorFactory = require('../utils/globalErrorFactory')
const setDataFactory = require('../utils/setDataFactory')
const Entity2 = require('../models/entity2')
const repository = require('../services/repository')
const entity2Factory = require('../models/entity2Factory')
const paginationFactory = require('../utils/paginationFactory')
const { ERROR_RECORD_NOT_FOUND } = require('../utils/constant')

const getAll = async (req, res, next) => {
	try {
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
	} catch (err) {
		next(err)
	}
}

const insert = async (req, res, next) => {
	try {
		const entityToInsert = entity2Factory.factory(req.body)
		const entityRecord = await repository.insert(Entity2, entityToInsert)
		const data = setDataFactory('data', entityRecord)

		res.status(HttpStatus.CREATED).json(data)
	} catch (err) {
		next(err)
	}
}

const getById = async (req, res, next) => {
	try {
		const record = await repository.getById(Entity2, req.params)
		const data = setDataFactory('data', record)
		res.json(data)
	} catch (err) {
		next(err)
	}
}

const updateById = async (req, res, next) => {
	try {
		const entityToUpdate = entity2Factory.factory(req.body)
		let record = await repository.updateById(
			Entity2,
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
		await repository.deleteById(Entity2, req.params)
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
