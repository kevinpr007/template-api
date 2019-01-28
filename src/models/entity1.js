const mongoose = require('mongoose')
const validator = require('validator')
const timestampPlugin = require('./plugins/timestamp')

const MyNumberFieldValidation = (value) => {
	return validator.isNumeric(value)
}

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
				validator: MyNumberFieldValidation,
				message: (props) => `${props.value} is not a valid number.`,
			},
		},
	},
	{ timestamps: true }
)

schema.plugin(timestampPlugin)

schema.virtual('testVirtual').set(function(name) {
	let str = name.split(' ')
	this.MyField = str[0]
	this.MyDescription = str[1]
})

schema.virtual('testVirtual').get(function() {
	return this.MyField + ' ' + this.MyDescription
})

module.exports = mongoose.models.Entity1 || mongoose.model('Entity1', schema)
