const express = require('express')
const {getusers} = require('../controllers/adminController')

const router = express.Router()

router.get('/users', getusers)

module.exports = router