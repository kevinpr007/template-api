const HttpStatus = require('http-status-codes')
const parseErrors = require('../utils/parseErrors')
const globalErrorFactory = require('../utils/globalErrorFactory')
const setData = require('../utils/composeResponse')
const responseRepositoryFactory = require('../utils/responseRepositoryFactory')

const getAll = async (res, Schema) => {
	//TODO: Add pagination
	try {
		const allRecords = await Schema.find()
		if (allRecords) {
			let response = responseRepositoryFactory(Schema.modelName, allRecords)
			res.json(setData(response))
		} else {
			//TODO: Fix
			//TODO: Remove errors
			res
				.status(HttpStatus.NOT_FOUND)
				.json(globalErrorFactory('Records not found.'))
		}
	} catch (err) {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalErrorFactory('Error', parseErrors(err.errors)))
	}
}

const insert = async (res, Schema, data) => {
	const { MyField, MyDescription, MyNumberField } = data

	try {
		const entity = new Schema({ MyField, MyDescription, MyNumberField })
		const entityRecord = await entity.save()
		let response = responseRepositoryFactory(Schema.modelName, entityRecord)
		res.json(setData(response))
	} catch (err) {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalErrorFactory('Error saving data', parseErrors(err.errors)))
	}
}

const getById = async (res, Schema, data) => {
	const { id } = data

	try {
		const record = await Schema.findById(id)
		if (record) {
			let response = responseRepositoryFactory(Schema.modelName, record)
			res.json(setData(response))
		} else {
			res
				.status(HttpStatus.NOT_FOUND)
				.json(globalErrorFactory('Record not found.'))
		}
	} catch (err) {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalErrorFactory('Error', parseErrors(err.errors)))
	}
}

const updateById = async (res, Schema, idData, dataToUpdate) => {
	const { id } = idData
	const { data } = dataToUpdate

	try {
		let record = await Schema.findByIdAndUpdate(
			id,
			{ $set: data, $inc: { __v: 1 } },
			{ new: true }
		)

		if (record) {
			let response = responseRepositoryFactory(Schema.modelName, record)
			res.json(setData(response))
		} else {
			res
				.status(HttpStatus.NOT_FOUND)
				.json(globalErrorFactory('Record not found.'))
		}
	} catch (err) {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalErrorFactory('Error', parseErrors(err.errors)))
	}
}

const deleteById = async (res, Schema, data) => {
	const { id } = data

	try {
		let record = await Schema.findByIdAndRemove(id)

		if (record) {
			res.json()
		} else {
			res
				.status(HttpStatus.NOT_FOUND)
				.json(globalErrorFactory('Record not found.'))
		}
	} catch (err) {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalErrorFactory('Error', parseErrors(err.errors)))
	}
}

module.exports = {
	getAll,
	insert,
	getById,
	updateById,
	deleteById,
}
