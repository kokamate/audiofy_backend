const express = require('express')
const { auth } = require('../middleware/userMiddleware')
const { upload } = require('../middleware/updateSongImg')
const { updateSongImg } = require('../controllers/songImgController')

const router = express.Router()

// Frissítés egy zene képével
router.put('/:songID', auth, upload.single('img'), updateSongImg)

module.exports = router