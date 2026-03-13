const { connect } = require('../db/db');
const { getUsers, deleteUser, getMusics, deleteSongs, updateUser, updateSong } = require('../models/adminModel');
const { getUsers } = require('../models/adminModel');

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

async function updateuser(req, res) {
    try {
        const { userID } = req.params
        const { email, role } = req.body

        const result = await updateUser(userID, email, role)

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Nincs ilyen felhasználó' })
        }

        return res.status(200).json({ message: 'Sikeres módosítás' })

    } catch (err) {
        return res.status(500).json({ error: 'Szerkesztés user hiba', err })
    }
}

async function updatesong(req, res) {
    try {
        const { songID } = req.params
        const { name } = req.body

        const result = await updateSong(songID, name)

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Nincs ilyen zene' })
        }

        return res.status(200).json({ messgae: 'Sikeres módosítás' })
    } catch (err) {
        return res.status(500).json({ error: 'Szerkeztes song hiba', err })
    }
}

module.exports = { getusers, deleteuser, getmusics, deletesongs, updateuser, updatesong }
module.exports = {  getusers}
