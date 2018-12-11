const HttpStatus = require('http-status-codes')
const parseErrors = require('../utils/parseErrors')
const globalError = require('../utils/globalError')
const setData = require('../utils/composeResponse')

const getAll = async (req, res, Schema) => {
	//TODO: Add pagination
	try {
		const allRecords = await Schema.find()
		if (allRecords) {
			let response = {}
			response[Schema.modelName] = allRecords
			res.json(setData(response))
		} else {
			//TODO: Fix
			//TODO: Remove errors
			res.status(HttpStatus.NOT_FOUND).json(globalError('Records not found.'))
		}
	} catch (err) {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalError('Error', parseErrors(err.errors)))
	}
}

const insert = async (req, res, Schema, data) => {
	const { MyField, MyDescription, MyNumberField } = data

	try {
		const entity = new Schema({ MyField, MyDescription, MyNumberField })
		const entityRecord = await entity.save()
		//TODO: Create function
		let response = {}
		response[Schema.modelName] = entityRecord
		res.json(setData(response))
	} catch (err) {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalError('Error saving data', parseErrors(err.errors)))
	}
}

const getById = async (req, res, Schema, data) => {
	const { id } = data

	try {
		const record = await Schema.findById(id)
		if (record) {
			//TODO: Create function
			let response = {}
			response[Schema.modelName] = record
			res.json(setData(response))
		} else {
			res.status(HttpStatus.NOT_FOUND).json(globalError('Record not found.'))
		}
	} catch (err) {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalError('Error', parseErrors(err.errors)))
	}
}

const updateById = async (req, res, Schema, idData, dataToUpdate) => {
	const { id } = idData
	const { data } = dataToUpdate

	try {
		//TODO: FIX update
		let record = await Schema.findOneAndUpdate(
			id,
			{ $set: data },
			{ new: true }
		)

		if (record) {
			//TODO: Create function
			let response = {}
			response[Schema.modelName] = record
			res.json(setData(response))
		} else {
			res.status(HttpStatus.NOT_FOUND).json(globalError('Record not found.'))
		}
	} catch (err) {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalError('Error', parseErrors(err.errors)))
	}
}

const deleteById = async (req, res, Schema, data) => {
	const { id } = data

	try {
		let record = await Schema.findByIdAndRemove(id)

		if (record) {
			res.json()
		} else {
			res.status(HttpStatus.NOT_FOUND).json(globalError('Record not found.'))
		}
	} catch (err) {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalError('Error', parseErrors(err.errors)))
	}
}

module.exports = {
	getAll,
	insert,
	getById,
	updateById,
	deleteById,
}
