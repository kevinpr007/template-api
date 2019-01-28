const logger = require('./logger')()
const mongoose = require('mongoose')
const Promise = require('bluebird')
mongoose.Promise = Promise

module.exports = () => {
	mongoose.set(process.env.MONGODB_LOG_LEVEL, true)

	const mongooseSettings = (coll, method, query, doc, options) => {
		const set = {
			coll: coll,
			method: method,
			query: query,
			doc: doc,
			options: options,
		}

		logger.debug({
			dbQuery: set,
		})
	}
	mongoose.set(process.env.MONGODB_LOG_LEVEL, mongooseSettings)

	mongoose.connection.on('connecting', () => {
		logger.debug('Trying to establish a connection to MongoDB')
	})

	mongoose.connection.on('connected', () => {
		logger.debug('Connection established successfully')
	})

	mongoose.connection.on('error', (err) => {
		logger.debug(`Connection to MongoDB failed: ${err}`)
	})

	mongoose.connection.on('disconnected', () => {
		logger.debug('MongoDB connection closed')
	})

	return mongoose.connect(process.env.MONGODB_URL)
}
