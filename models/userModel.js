const db = require('../db/db')

async function findByEmail(email) {
    const sql = 'SELECT * FROM user WHERE email = ?'
    const [result] = await db.query(sql, [email])

    return result[0] || null
}

async function createUser(email, hash) {
    const sql = 'INSERT INTO user (userID, email, psw, role) VALUES (NULL, ?, ?, "user")'
    const [result] = await db.query(sql, [email, hash])

    return { insertId: result.insertId }
}

async function getMusics() {
    const sql = 'SELECT songID, name, musicImg, title, song FROM music;'
    const [result] = await db.query(sql)

    return result
}

async function addLike(userID, songID) {
    const sql = 'INSERT IGNORE INTO `liked songs` (userID, songID) VALUES (?, ?)'
    await db.query(sql, [userID, songID])
}

async function removeLike(userID, songID) {
    const sql = 'DELETE FROM `liked songs` WHERE userID = ? AND songID = ?'
    await db.query(sql, [userID, songID])
}

async function getLikedSongIDs(userID) {
    const sql = 'SELECT songID FROM `liked songs` WHERE userID = ?'
    const [result] = await db.query(sql, [userID])
    return result.map(row => row.songID)
}

async function toggleLike(userID, songID) {
    const existingSql = 'SELECT * FROM `liked songs` WHERE userID = ? AND songID = ?'
    const [existing] = await db.query(existingSql, [userID, songID])
    
    if (existing.length > 0) {
        await removeLike(userID, songID)
        return { liked: false }
    } else {
        await addLike(userID, songID)
        return { liked: true }
    }
}

module.exports = { findByEmail, createUser, getMusics, addLike, removeLike, getLikedSongIDs, toggleLike }