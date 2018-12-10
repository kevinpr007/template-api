const HttpStatus = require('http-status-codes')
const Entity1 = require('../models/entity1')
const parseErrors = require('../utils/parseErrors')
const globalError = require('../utils/globalError')
const setData = require('../utils/composeResponse.js')

//TODO: Add in service
const getAll = async (req, res) => {
	//TODO: Add pagination
	try {
		const entities = await Entity1.find()
		if (entities) {
			res.json(setData({ entity1: entities }))
		} else {
			//TODO: Fix
			res.status(HttpStatus.NOT_FOUND).json(globalError('Record not found.'))
		}
	} catch (err) {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalError('Error', parseErrors(err.errors)))
	}
}

const insert = async (req, res) => {
	const { MyField, MyDescription, MyNumberField } = req.body.entity1

	try {
		const entity1 = new Entity1({ MyField, MyDescription, MyNumberField })
		const entityRecord = await entity1.save()
		res.json(setData({ entity1: entityRecord }))
	} catch (err) {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalError('Error saving data', parseErrors(err.errors)))
	}
}

const getById = async (req, res) => {
	const { id } = req.params

	try {
		const entity1 = await Entity1.findById(id)
		if (entity1) {
			res.json(setData({ entity1: entity1 }))
		} else {
			res.status(HttpStatus.NOT_FOUND).json(globalError('Record not found.'))
		}
	} catch (err) {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalError('Error', parseErrors(err.errors)))
	}
}

const updateById = async (req, res) => {
	const { id } = req.params
	const { data } = req.body

	try {
		let entity1 = await Entity1.findOneAndUpdate(
			id,
			{ $set: data },
			{ new: true }
		)

		if (entity1) {
			res.json(setData({ entity1: entity1 }))
		} else {
			res.status(HttpStatus.NOT_FOUND).json(globalError('Record not found.'))
		}
	} catch (err) {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalError('Error', parseErrors(err.errors)))
	}
}

const deleteById = async (req, res) => {
	const { id } = req.params

	try {
		let entity1 = await Entity1.findByIdAndRemove(id)

		if (entity1) {
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
