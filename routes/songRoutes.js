const express = require('express')
const { auth } = require('../middleware/userMiddleware')
const { upload } = require('../middleware/uploadSong')
const { uploadSong } = require('../controllers/songController')

const router = express.Router()

router.post(
    '/:songID',
    auth,
    upload.fields([
        { name: 'song', maxCount: 1 },
        { name: 'img', maxCount: 1 }
    ]),
    uploadSong
)

module.exports = router