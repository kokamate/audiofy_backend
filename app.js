const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require("cors");

const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use('/user/', userRoutes)

module.exports = app