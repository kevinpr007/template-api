const { createLogger } = require('bunyan')
const moment = require('moment')
const bformat = require('bunyan-format')

//Options
//simple, short, long, inspect, bunyan, { outputMode: 'json', jsonIndent: 2},
const formatOut = bformat({ outputMode: 'short', levelInString: true })

const reqSerializer = (req) => {
	return {
		method: req.method,
		url: req.url,
		headers: req.headers,
	}
}

const dbSerializer = (data) => {
	const query = JSON.stringify(data.query)
	const options = JSON.stringify(data.options || {})

	return `db.${data.coll}.${data.method}(${query}, ${options})`
}

module.exports = () =>
	createLogger({
		name: process.env.APP_NAME_DEV,
		src: false,
		streams: [
			{
				level: process.env.BUNYAN_DEBUG_LEVEL,
				stream: formatOut,
			},
			{
				type: 'rotating-file',
				level: process.env.BUNYAN_DEBUG_LEVEL,
				path: `./log/${moment(new Date()).format('YYYY-MM-DD')}.log`,
				period: process.env.BUNYAN_PERIOD, // daily rotation
				count: parseInt(process.env.BUNYAN_BACK_COPIES), // keep 5 back copies
			},
		],
		serializers: {
			// Serializers
			// req: reqSerializer,
			dbQuery: dbSerializer,

			// req: bunyan.stdSerializers.req,
			// res: bunyan.stdSerializers.res,

			// Examples
			// logger.debug({req: req})
			// logger.debug({res: res})
		},
	})
