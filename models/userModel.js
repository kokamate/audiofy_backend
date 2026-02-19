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

module.exports = { findByEmail, createUser }