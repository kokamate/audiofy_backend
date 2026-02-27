const { getUsers } = require('../models/adminModel');

async function getusers(req, res) {
    try {
        const users = await getUsers()
       
        return res.status(200).send(users)

    } catch (err) {
        return res.status(500).json({ error: 'Szerver oldali hiba', err })
    }
}

module.exports = {  getusers}