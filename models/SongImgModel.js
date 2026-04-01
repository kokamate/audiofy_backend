const db = require('../db/db')

async function insertSongImg(songID, musicImg) {
    const sql = 'UPDATE music SET musicImg = ? WHERE songID = ?'
    const [result] = await db.query(sql, [musicImg, songID])
    return result.affectedRows ? result : null
}

module.exports = { insertSongImg }