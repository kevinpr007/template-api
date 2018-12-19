module.exports = (schema, options) => {
	// Add the two fields to the schema
	schema.add({
		createdAtPlugin: Date,
		updatedAtPlugin: Date,
	})

	// Create a pre-save hook
	schema.pre('save', function(next) {
		let now = Date.now()
		//TODO: Version updates
		this.updatedAtPlugin = now
		// Set a value for createdAtPlugin only if it is null
		if (!this.createdAtPlugin) {
			this.createdAtPlugin = now
		}
		// Call the next function in the pre-save chain
		next()
	})
}
