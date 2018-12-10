const mongoose = require('mongoose')
const validator = require('validator')
const entity1Service = require('../services/entity1')
const timestampPlugin = require('./plugins/timestamp')

let schema = new mongoose.Schema(
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
			validate: {
				validator: (value) => {
					return validator.isNumeric(value)
				},
				message: (props) => `${props.value} is not a valid number.`,
			},
		},
	},
	{ timestamps: true }
)

schema.plugin(timestampPlugin)

schema.methods.getPagination = function(id1, id2) {
	return entity1Service.getPagination(id1, id2)
}
schema.methods.setMyField = function(data) {
	this.MyField = entity1Service.setMyField(data)
}

schema.virtual('testVirtual').set(function(name) {
	let str = name.split(' ')
	this.MyField = str[0]
	this.MyDescription = str[1]
})

schema.virtual('testVirtual').get(function() {
	return this.MyField + ' ' + this.MyDescription
})

module.exports = mongoose.model('Entity1', schema)
