const db = require('../db/db');

async function getUsers() {
    const sql = 'SELECT userID, email, role FROM user';
    const [result] = await db.query(sql);
    return result || [];
}

async function deleteUser(userID) {
    const sql = 'DELETE FROM user WHERE userID = ?';
    const [result] = await db.query(sql, [userID]);
    return result;
}

async function deleteSongs(songID) {
    const sql = 'DELETE FROM music WHERE songID = ?';
    const [result] = await db.query(sql, [songID]);
    return result;
}

async function getMusics() {
    const sql = 'SELECT songID, userID, name, title, musicFilePath FROM music';
    const [result] = await db.query(sql);
    return result || [];
}

async function updateUser(userID, email, role) {
    const sql = 'UPDATE user SET email = ?, role = ? WHERE userID = ?';
    const [result] = await db.query(sql, [email, role, userID]);
    return result;
}

async function updateSong(songID, name, title) {
    const sql = 'UPDATE music SET name = ?, title = ? WHERE songID = ?';
    const [result] = await db.query(sql, [name, title, songID]);
    return result;
}

async function insertSong(userID, name, title, musicFilePath) {
    const sql = 'INSERT INTO music (userID, name, title, musicFilePath) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [userID, name, title, musicFilePath]);
    return { songID: result.insertId, userID, name, title, musicFilePath };
}

module.exports = { getUsers, deleteUser, getMusics, deleteSongs, updateUser, updateSong, insertSong };