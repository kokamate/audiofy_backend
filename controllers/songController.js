const path = require('path')
const db = require('../db/db')

const uploadSong = async (req, res) => {
  try {
    const { songID } = req.params
    const userID = req.user.userID

    if (!songID) {
      return res.status(400).json({ message: 'Hiányzik a songID' })
    }

    const songFile = req.files['song']?.[0]
    const imgFile = req.files['img']?.[0]

    if (!songFile) {
      return res.status(400).json({ message: 'Nincs feltöltött zene' })
    }

    const songPath = path.join(
      '/uploads/song',
      String(songID),
      songFile.filename
    ).replace(/\\/g, '/')

    const imgPath = imgFile
      ? path.join(
          '/uploads/images',
          String(songID),
          imgFile.filename
        ).replace(/\\/g, '/')
      : ''

    await db.query(
      `INSERT INTO music (songID, userID, name, musicImg, title, song)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         userID = VALUES(userID),
         song = VALUES(song),
         musicImg = VALUES(musicImg)`,
      [
        songID,
        userID,
        '',
        imgPath,
        '',
        songPath
      ]
    )

    res.status(200).json({
      message: 'Feltöltés sikeres',
      songPath,
      imgPath
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = { uploadSong }