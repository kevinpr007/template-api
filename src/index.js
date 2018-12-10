//TODO: Add clusters
//TODO: Add travis

//Configuration Variables
require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const HttpStatus = require('http-status-codes')

//Setting Express App
const app = express()

//Helmet Settings
app.use(helmet())

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
/**
 * CORS middleware
 */
//   app.use((req, res, next) => {
//     const allowedHeaders = ['Origin', 'X-Requested-With',
//       'Content-Type', 'Accept', 'Authorization',
//       'Access-Control-Allow-Credentials']

//     const allowedMethods = ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']

//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Credentials', 'true')
//     res.header('Access-Control-Allow-Methods', allowedMethods.join(', '))
//     res.header('Access-Control-Allow-Headers', allowedHeaders.join(', '))
//     res.header('Access-Control-Expose-Headers', 'X-Updated-JWT')
//     next()
//   })

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)

//TODO:ADD pagination
/**
 * Pagination middleware
 */
//app.use(pagedJson)

//Database Connection
require('./config/mongoose')()

//Routes Configuration Area
const main = require('./routes/main')
const users = require('./routes/users')
const auth = require('./routes/auth')
const entity1 = require('./routes/entity1')

//Setting Routes
app.use('/', main)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/entity1', entity1)

//Set static Pages
app.use(express.static('public'))

//TODO: Global middle ware
/**
 * Global Error middleware
 */
//   app.use((req, res, next) => {
//     const err = new Error(HttpStatus.getStatusText(HttpStatus.NOT_FOUND))
//     err.status = HttpStatus.NOT_FOUND
//     next(err)
//   })

//   app.use((err, req, res, next) => {
//     logService.saveLog(err)
//     res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
//       message: err.message,
//       error: app.get('env') === 'development' ? err : {}
//     })
//   })

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

//Redirect all unknown pages to not found
app.get('/*', (req, res) => {
	res.status(HttpStatus.NOT_FOUND).json()
})

//Start service
app.listen(process.env.API_PORT, () =>
	console.log(`Running on ${process.env.HOST}:${process.env.API_PORT}`)
)

// TODO: Add console.error
// 		(server.on('error', error => {
//     if (error.syscall !== 'listen') throw error
//     const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

//     switch (error.code) {
//       case 'EACCES':
//         console.error(`${bind} requires elevated privileges`)
//         process.exit(1)
//       case 'EADDRINUSE':
//         console.error(`${bind} is already in use`)
//         process.exit(1)
//       default:
//         throw error
//     }
//   }));
