const express = require('express')
const {getusers, getmusics, deleteuser, deletesongs} = require('../controllers/adminController')

const router = express.Router()

router.get('/users', getusers)
router.get('/musics', getmusics)
router.delete('/deleteusers/:userID', deleteuser)
router.delete('/deletesongs/:songID', deletesongs)

module.exports = router