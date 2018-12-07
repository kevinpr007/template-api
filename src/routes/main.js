const express = require('express')
const { MainPage } = require('../controllers/main')

const router = express.Router()

router.get('/', MainPage)

module.exports = router
