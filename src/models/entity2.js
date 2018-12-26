const mongoose = require('mongoose')
const timestampPlugin = require('./plugins/timestamp')

let schema = new mongoose.Schema(
	{
		MyString: {
			type: String,
			required: true,
		},
		MyNumber: {
			type: Number,
			required: true,
		},
		MyDescription: {
			type: String,
			required: false,
		},
		Entity1_Id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Entity1',
			required: false,
		},
	},
	{ timestamps: true }
)

schema.plugin(timestampPlugin)

module.exports = mongoose.models.Entity2 || mongoose.model('Entity2', schema)
