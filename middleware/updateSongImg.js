const multer = require('multer')
const fs = require('fs')
const path = require('path')

const MAX_FILE_SIZE = 1024 * 1024 * 700

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { songID } = req.params
        if (!songID) {
            return cb(new Error('Hiányzik a songID'), null)
        }
        const uploadDir = path.join(process.cwd(), 'uploads', String(songID))
        try {
            fs.mkdirSync(uploadDir, { recursive: true })
            cb(null, uploadDir)
        } catch (err) {
            cb(err, null)
        }
    },
    filename: (req, file, cb) => {
        const { userID } = req.user
        if (!userID) {
            return cb(new Error('Nincs bejelentkezve'), null)
        }
        const now = new Date().toISOString().split('T')[0]
        cb(null, `${userID}-${now}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    // Csak a fájlnév kiterjesztését nézzük
    const filetypes = /\.(jfif|jpg|jpeg|png|gif|svg|webp|avif|bmp|tiff)$/i
    if (file.originalname.match(filetypes)) {
        cb(null, true) // engedélyezett
    } else {
        cb(new Error('Csak képformátumok megengedettek!'), false)
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter
})

module.exports = { upload }