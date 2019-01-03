const Promise = require('bluebird')
const { ERROR_PARAMS_CANT_BE_NULL } = require('../utils/constant')

const getAll = async (
	Schema,
	query,
	page,
	limit,
	sort = null,
	select = null
) => {
	if (!Schema) {
		throw new Error(ERROR_PARAMS_CANT_BE_NULL)
	}

	if (!query) {
		throw new Error(ERROR_PARAMS_CANT_BE_NULL)
	}

	if (!page) {
		throw new Error(ERROR_PARAMS_CANT_BE_NULL)
	}

	if (!limit) {
		throw new Error(ERROR_PARAMS_CANT_BE_NULL)
	}

	let count = Schema.find(query),
		table = Schema.find(query)
			.skip(limit * page - limit) // skip the first 100 items
			.limit(limit) // limit to 10 items

	if (sort) {
		table.sort(sort) // sort ascending by firstName
	}

	if (select) {
		table.select(select) // select firstName only
	}

	return Promise.all([table.exec(), count.count()]) // execute the query
}

const insert = async (Schema, data) => {
	if (!data) {
		throw new Error(ERROR_PARAMS_CANT_BE_NULL)
	}
	return await new Schema(data).save()
}

const getById = async (Schema, data) => {
	const { id } = data
	return await Schema.findById(id)
}

const updateById = async (Schema, idData, dataToUpdate) => {
	const { id } = idData

	return await Schema.findByIdAndUpdate(
		id,
		{ $set: dataToUpdate },
		{ new: true }
	)
}

const deleteById = async (Schema, data) => {
	const { id } = data
	return await Schema.findByIdAndRemove(id)
}

module.exports = {
	getAll,
	insert,
	getById,
	updateById,
	deleteById,
}
