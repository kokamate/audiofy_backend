const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { log } = require('console')

const MAX_FILE_SIZE = 1024 * 1024 * 10

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { zsuri_id } = req.params
        //console.log(`zsuri_id: ${zsuri_id}`);
        if (!zsuri_id) {
            return cb(new Error('Hiányzik a zsűri azonosító'), null)
        }
        const uploadDir = path.join(process.cwd(), 'uploads', String(zsuri_id))
        //console.log(`uploadDir: ${uploadDir}`);
        try {
            fs.mkdirSync(uploadDir, { recursive: true })
            return cb(null, uploadDir)
        } catch (err) {
            return cb(err, null)
        }
    },

    filename: (req, file, cb) => {
        const { user_id } = req.user
        //console.log(`user_id: ${user_id}`);

        if (!user_id) {
            return cb(new Error('Nincs bejelentkezve'), null)
        }
        const now = new Date().toISOString().split('T')[0]
        //console.log(`most: ${now}`);
        cb(null, `${user_id}-${now}-${file.originalname}`)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        const filetypes = / jfif|jpg|jpeg|png|gif|svg|webp|avif|bmp|tiff/
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
        //console.log(`Kiterjesztés: ${extname}`);
        const mimetype = filetypes.test(file.mimetype)
        //console.log(`Mime típus: ${mimetype}`);

        if (extname && mimetype) {
            return cb(null, true)
        } else {
            cb(new Error('Csak képformátumok megengedettek!'), null)
        }
    }
})

module.exports = {upload}