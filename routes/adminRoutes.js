const express = require('express')
const {getusers, getmusics, deleteuser, deletesongs, updateuser, updatesong} = require('../controllers/adminController')
const { auth } = require('../middleware/userMiddleware')

const router = express.Router()

router.get('/users', getusers)
router.get('/musics', getmusics)
router.delete('/deleteusers/:userID', deleteuser)
router.delete('/deletesongs/:songID', deletesongs)
router.put('/updateuser/:userID', updateuser)
router.put('/updatesong/:songID', updatesong)

module.exports = router