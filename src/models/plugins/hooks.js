const hooks = (schema, options) => {
	// Create a pre-save hook
	schema.pre('save', function(next) {
		// Set a values
		if (this.__v !== undefined) {
			this.__v = this.__v + 1
		}

		// Call the next function in the pre-save chain
		next()
	})

	schema.pre('findOneAndUpdate', function(next) {
		// Set a values
		if (this.__v !== undefined) {
			this.__v = this.__v + 1
		}

		// Call the next function in the pre-save chain
		next()
	})

	schema.pre('findByIdAndUpdate', function(next) {
		// Set a values
		if (this.__v !== undefined) {
			this.__v = this.__v + 1
		}

		// Call the next function in the pre-save chain
		next()
	})
}

module.exports = hooks
