const express = require('express');
const {
  getusers,
  getmusics,
  deleteuser,
  deletesongs,
  updateuser,
  updatesong,
  uploadSong
} = require('../controllers/adminController');
const { upload } = require('../middleware/uploadSong');

const router = express.Router();

router.get('/users', getusers);
router.get('/musics', getmusics);
router.delete('/deleteusers/:userID', deleteuser);
router.delete('/deletesongs/:songID', deletesongs);
router.put('/updateuser/:userID', updateuser);
router.put('/updatesong/:songID', updatesong);

// Feltöltés több fájllal, song + img együtt
router.post('/uploadsong', upload.fields([
  { name: 'song', maxCount: 1 },
  { name: 'img', maxCount: 1 }
]), uploadSong);

module.exports = router;