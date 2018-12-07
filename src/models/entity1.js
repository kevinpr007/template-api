const mongoose = require('mongoose')
const validator = require('validator')
const entity1Service = require('../services/entity1')

const schema = new mongoose.Schema(
	{
		MyField: {
			type: String,
			required: true,
			index: true,
			unique: false,
			lowercase: false,
		},
		MyDescription: {
			type: String,
			required: false,
		},
		MyNumberField: {
			type: String,
			required: false,
			validate: (value) => {
				return validator.isNumeric(value)
			},
		},
	},
	{ timestamps: true }
)

schema.methods.getPagination = function(id1, id2) {
	return entity1Service.getPagination(id1, id2)
}
schema.methods.setMyField = function(data) {
	this.MyField = entity1Service.setMyField(data)
}

module.exports = mongoose.model('Entity1', schema)
