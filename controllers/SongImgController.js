const { insertSongImg } = require('../models/songImgModel')

async function updateSongImg(req, res) {
    try {
        const { songID } = req.params

        if (!req.file) {
            return res.status(400).json({ message: 'Nincs feltöltött kép' })
        }

        const musicImg = `uploads/${songID}/${req.file.filename}`
        const result = await insertSongImg(songID, musicImg)

        if (!result) {
            return res.status(404).json({ message: 'Zene nem található' })
        }

        res.status(200).json({ message: 'Sikeresen megváltoztattad a képet', path: musicImg })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Szerver error kép megváltoztatásánál', error: err.message })
    }
}

module.exports = { updateSongImg }