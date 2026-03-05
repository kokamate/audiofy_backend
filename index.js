require('dotenv').config()

const express = require('express')
const bcrypt = require('bcrypt')
const mysql = require('mysql2/promise')
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT
const HOST = process.env.HOST
const JWT_SECRET = process.env.JWT_SECRET

const app = express()
app.use(express.json())

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: "Z",
    connectionLimit: 10,
    queueLimit: 0
})

app.post('/api/register', async (req, res) => {
    try {
        const { email, psw } = req.body

        if (!email || !psw) {
            return res.status(400).json({ error: 'Hiányos input adatok!' })
        }

        const hash = await bcrypt.hash(psw, 5)
        const role = 'user'
        const sql = 'INSERT INTO `user` (userID,  email, psw, profileImg, role) VALUES (NULL , ?, ?, ?, ?)'

        const [result] = await connection.query(sql, [email, hash, role])
        console.log(result);

        return res.status(201).json({ message: 'Sikeres regisztráció!', userId: result.insertId })

    } catch (error) {
        if (error && error.code == 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Az email vagy felhasználó foglalt!' })
        }

        return res.status(500).json({ error: 'Server error', error })
    }
})

app.listen(PORT, HOST, () => {
    console.log(`IP: http://${HOST}:${PORT}`)
})
