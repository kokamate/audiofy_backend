const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { config } = require('../config/dotenvConfig')
const { findByEmail, createUser } = require('../models/userModel')

const cookieOpts = {
    httpOnly: true,
    secure: false, // https-nél true
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7
}

async function register(req, res) {
    try {
        const {email, psw } = req.body
        console.log(email, psw);

        if (!email || !psw) {
            return res.status(400).json({ error: 'Minden mezőt ki kell tölteni!' })
        }

        const exist = await findByEmail(email)
        if (exist) {
            return res.status(409).json({ error: 'Ez az email már létezik!' })
        }
        const hash = await bcrypt.hash(psw, 10)
        const { insertId } = await createUser(email, hash)

        return res.status(201).json({ message: 'Sikeres regisztráció!', insertId })

    } catch (err) {
        return res.status(500).json({ error: 'Szerver oldali hiba', err })
    }
}

async function login(req, res) {
    try {
        const { email, psw } = req.body
        //console.log(email, psw);
        
        if (!email || !psw) {
            return res.status(400).json({ error: 'Email és jelszó kötelező' })
        }

        const userSQL = await findByEmail(email)
        //console.log(userSQL);
        if (!userSQL) {
            return res.status(401).json({ error: 'Hibás email' })
        }

        const ok = await bcrypt.compare(psw, userSQL.psw)
        //console.log(ok);
        if (!ok) {
            return res.status(401).json({ error: 'Hibás jelszó' })
        }
        
        const token = jwt.sign(
            { userID: userSQL.userID, email: userSQL.email, psw: userSQL.psw, role: userSQL.role},
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRES_IN }
        )
        //console.log(token);
        res.cookie(config.COOKIE_NAME, token, cookieOpts)
        return res.status(200).json({ message: 'Sikeres bejelentkezés' })   
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({ error: 'Bejelentkezési hiba', err })
    }
}

// teszt végpontot, hogy a cookie-ból sikeresen ki tudjuk szedni, hogy melyik felhasználóval vagyunk bejelentkezve
async function whoAmI(req, res) {
    const { user_id, email, profileImg, role} = req.user
    try {
        return res.status(200).json({user_id: user_id, email: email, profileImg: profileImg, role: role})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'whoAmI server oldali hiba'})
        return
    }
}

async function logout(req, res) {
    return res.clearCookie(config.COOKIE_NAME, { path: '/'}).status(200).json({ message: 'Sikeres kilépés' })
}

async function get(req, res) {
    return res.clearCookie(config.COOKIE_NAME, { path: '/'}).status(200).json({ message: 'Sikeres kilépés' })
}

module.exports = { register, login, whoAmI, logout}