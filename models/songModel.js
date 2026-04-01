const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    filename: String,
    path: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Song', songSchema)