const db = require('../db/db'); // mysql2 pool
const fs = require('fs');
const path = require('path');

// --- Users ---
const getusers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT userID, email, role FROM user'); // a tábla neve 'user'
    res.json(rows);
  } catch (err) {
    console.error('Hiba a getusers-nél:', err);
    res.status(500).json({ message: 'Hiba a felhasználók lekérésekor' });
  }
};

// --- Musics ---
const getmusics = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT songID, userID, name, musicImg, title, song FROM music'); // tábla neve 'music'
    res.json(rows);
  } catch (err) {
    console.error('Hiba a getmusics-nél:', err);
    res.status(500).json({ message: 'Hiba a zenék lekérésekor' });
  }
};

// --- Delete User ---
const deleteuser = async (req, res) => {
  const { userID } = req.params;
  try {
    await db.query('DELETE FROM user WHERE userID = ?', [userID]);
    res.json({ message: 'Felhasználó törölve' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hiba a felhasználó törlésekor' });
  }
};

// --- Delete Song ---
const deletesongs = async (req, res) => {
  const { songID } = req.params;
  try {
    await db.query('DELETE FROM music WHERE songID = ?', [songID]);
    res.json({ message: 'Zene törölve' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hiba a zene törlésekor' });
  }
};

// --- Update User ---
const updateuser = async (req, res) => {
  const { userID } = req.params;
  const { email, role } = req.body;
  try {
    await db.query('UPDATE user SET email = ?, role = ? WHERE userID = ?', [email, role, userID]);
    res.json({ message: 'Felhasználó frissítve' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hiba a felhasználó frissítésekor' });
  }
};

// --- Update Song ---
const updatesong = async (req, res) => {
  const { songID } = req.params;
  const { name, title } = req.body;
  try {
    await db.query('UPDATE music SET name = ?, title = ? WHERE songID = ?', [name, title, songID]);
    res.json({ message: 'Zene frissítve' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hiba a zene frissítésekor' });
  }
};

const uploadSong = async (req, res) => {
  try {
    const songFile = req.files?.song?.[0];
    const imgFile = req.files?.img?.[0];

    if (!songFile) return res.status(400).json({ message: 'Nincs feltöltött zene fájl!' });
    if (!imgFile) return res.status(400).json({ message: 'Nincs feltöltött kép!' });

    const { name, title, userID } = req.body;

    // 1️⃣ Először INSERT placeholder-rel → auto increment songID
    const [result] = await db.query(
      `INSERT INTO music (userID, name, musicImg, title, song)
       VALUES (?, ?, ?, ?, ?)`,
      [userID, name || '', '', title || '', '']
    );

    const songID = result.insertId;
    if (!songID) throw new Error('DB nem adott vissza songID-t!');

    // 2️⃣ Létrehozzuk a songID mappát
    const songDir = path.join(process.cwd(), 'uploads', String(songID));
    fs.mkdirSync(songDir, { recursive: true });

    // 3️⃣ Útvonalak a fájloknak
    const songPath = path.join('/uploads', String(songID), songFile.originalname).replace(/\\/g, '/');
    const imgPath = path.join('/uploads', String(songID), imgFile.originalname).replace(/\\/g, '/');

    // 4️⃣ Fájlok áthelyezése a végleges mappába
    fs.renameSync(songFile.path, path.join(songDir, songFile.originalname));
    fs.renameSync(imgFile.path, path.join(songDir, imgFile.originalname));

    // 5️⃣ Frissítés DB-ben a valós útvonalakkal
    await db.query(
      `UPDATE music SET song = ?, musicImg = ? WHERE songID = ?`,
      [songPath, imgPath, songID]
    );

    res.status(200).json({
      message: 'Feltöltés sikeres!',
      songID,
      songPath,
      imgPath
    });

  } catch (err) {
    console.error('UPLOAD SONG HIBA:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getusers,
  getmusics,
  deleteuser,
  deletesongs,
  updateuser,
  updatesong,
  uploadSong
};