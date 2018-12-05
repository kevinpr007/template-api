//TODO: Add clusters
//Configuration Variables
require('dotenv').config()

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const HttpStatus = require('http-status-codes')

//Routes Configuration Area
const auth = require('./routes/auth')
const users = require('./routes/users')

//Setting Express App
const app = express()
app.use(bodyParser.json())

//Database Connection
require('./config/mongoose')()

//Setting Routes
app.use('/api/users', users)
app.use('/api/auth', auth)

//Set static Pages
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

//TODO:Add Global Error
app.get('/*', (req, res) => {
	res.status(HttpStatus.NOT_FOUND).json()
})

//Start service
app.listen(process.env.API_PORT, () =>
	console.log(`Running on ${process.env.HOST}:${process.env.API_PORT}`)
)
