const express = require('express')
const { MainPage, apiDoc } = require('../controllers/main')

const router = express.Router()

router.get('/', MainPage)
router.get('/apidoc', apiDoc)

module.exports = router
