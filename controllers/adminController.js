const { getUsers, deleteUser, getMusics, deleteSongs } = require('../models/adminModel');

async function getusers(req, res) {
    try {
        const users = await getUsers()

        return res.status(200).send(users)

    } catch (err) {
        return res.status(500).json({ error: 'Szerver oldali hiba', err })
    }
}

async function getmusics(req, res) {
    try {
        const users = await getMusics()

        return res.status(200).send(users)

    } catch (err) {
        return res.status(500).json({ error: 'Szerver oldali hiba', err })
    }
}

async function deleteuser(req, res) {
    try {
        const { userID } = req.params
        const result = await deleteUser(userID)

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: 'Nincs ilyen felhasználó' })
        }
        return res.status(204).send()

    } catch (err) {
        return res.status(500).json({ error: 'Szerver oldali hiba', err })
    }
}

async function deletesongs(req, res) {
    try {
        const { songID } = req.params
        const result = await deleteSongs(songID)

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: 'Nincs ilyen zene' })
        }
        return res.status(204).send()

    } catch (err) {
        return res.status(500).json({ error: 'Szerver oldali hiba', err })
    }
}

module.exports = { getusers, deleteuser, getmusics, deletesongs }