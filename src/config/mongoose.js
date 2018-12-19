const logger = require('./logger')()
const mongoose = require('mongoose')
const Promise = require('bluebird')
mongoose.Promise = Promise

module.exports = () => {
	mongoose.set(process.env.MONGODB_LOG_LEVEL, true)

	mongoose.set(
		process.env.MONGODB_LOG_LEVEL,
		(coll, method, query, doc, options) => {
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
	)

	mongoose.connection.on('connecting', () => {
		console.log('Trying to establish a connection to MongoDB')
	})

	mongoose.connection.on('connected', () => {
		console.log('Connection established successfully')
	})

	mongoose.connection.on('error', (err) => {
		console.log(`Connection to MongoDB failed: ${err}`)
	})

	mongoose.connection.on('disconnected', () => {
		console.log('MongoDB connection closed')
	})

	return mongoose.connect(process.env.MONGODB_URL)
}
