const express = require('express')
const { MainPage } = require('../controller/main')

const router = express.Router()

router.get('/', MainPage)

module.exports = router
