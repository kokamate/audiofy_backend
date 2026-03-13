const db = require('../db/db')

async function getUsers() {
    const sql = 'SELECT userID, email, role FROM user'
    const [result] = await db.query(sql)

    return result || null
}

async function deleteUser(userID) {
    const sql = 'DELETE FROM user WHERE user.userID = ?'
    const [result] = await db.query(sql, [userID])

    return result
}

async function deleteSongs(songID) {
    const sql = 'DELETE FROM music WHERE music.songID = ?'
    const [result] = await db.query(sql, [songID])

    return result
}


async function getMusics() {
    const sql = 'SELECT songID, userID, name FROM music;'
    const [result] = await db.query(sql)

    return result
}

async function updateUser(userID, email, role) {
    const sql = 'UPDATE user SET email = ?, role = ? WHERE user.userID = ?'
    const [result] = await db.query(sql, [email, role, userID])

    return result
}

async function updateSong(songID, name) {
    const sql = 'UPDATE music SET name = ? WHERE music.songID = ?'
    const [result] = await db.query(sql, [name, songID])
    return result
}

module.exports = { getUsers, deleteUser, getMusics, deleteSongs, updateUser, updateSong }