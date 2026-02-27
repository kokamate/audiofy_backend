const db = require('../db/db')

async function getUsers() {
    const sql = 'SELECT userID, email, role FROM user'
    const [result] = await db.query(sql)

    return result || null
}


module.exports = { getUsers}