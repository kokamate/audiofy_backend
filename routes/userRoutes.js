const express = require('express')
const { register, login, whoAmI, logout, getmusics, toggleLikeSong, getLikedSongIDsHandler } = require('../controllers/userController')
const { auth } = require('../middleware/userMiddleware')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/whoami', auth, whoAmI)
router.post('/logout', auth, logout)
router.get('/musics', getmusics)
router.post('/like/:songID', auth, toggleLikeSong)
router.get('/liked-songs', auth, getLikedSongIDsHandler)

module.exports = router