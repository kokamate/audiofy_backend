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
    const sql = 'SELECT name, musicImg, title, song FROM music;'
    const [result] = await db.query(sql)

    return result
}

module.exports = { findByEmail, createUser, getMusics }