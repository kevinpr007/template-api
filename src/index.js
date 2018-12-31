//TODO: Add clusters
//TODO: Add travis

//Configuration Variables
require('dotenv').config()

//General Imports
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const HttpStatus = require('http-status-codes')
const compression = require('compression')
const globalErrorMiddleware = require('./middlewares/globalError')

//Setting Express App
const app = express()

//Helmet Settings
app.use(helmet())

// compress all responses
app.use(compression())

//Cors Settings
const whitelist = process.env.CORS_WHITELIST.split(',')
const corsOptions = {
	origin: function(origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)

//Database Connection
require('./config/mongoose')()

//Routes Configuration Area
const main = require('./routes/main')
const users = require('./routes/users')
const auth = require('./routes/auth')
const entity1 = require('./routes/entity1')
const entity2 = require('./routes/entity2')
const admin = require('./routes/admin')

//Setting Routes
app.use('/', main)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/entity1', entity1)
app.use('/api/entity2', entity2)
app.use('/api/admin', admin)

//Set static Pages
app.use(express.static('public'))

//Redirect all unknown pages to not found
app.all('/*', (req, res) => {
	res.status(HttpStatus.NOT_FOUND).json()
})

//Global Error Middleware
app.use(globalErrorMiddleware)

//Start service
app.listen(process.env.API_PORT, () =>
	console.log(`Running on ${process.env.HOST}:${process.env.API_PORT}`)
)

app.on('error', (error) => {
	if (error.syscall !== 'listen') throw error
	const bind =
		typeof process.env.API_PORT === 'string'
			? `Pipe ${process.env.API_PORT}`
			: `Port ${process.env.API_PORT}`

	switch (error.code) {
	case 'EACCES':
		console.error(`${bind} requires elevated privileges`)
		process.exit(1)
		break
	case 'EADDRINUSE':
		console.error(`${bind} is already in use`)
		process.exit(1)
		break
	default:
		throw error
	}
})
