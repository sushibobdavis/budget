const express = require('express')
const router = express.Router()

require('./routes/budget')(router)

module.exports = router
