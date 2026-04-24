const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const songRoutes = require('./routes/songRoutes');

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use(express.json({ limit: '800mb' }));
app.use(express.urlencoded({ limit: '800mb', extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/song', songRoutes);

module.exports = app;