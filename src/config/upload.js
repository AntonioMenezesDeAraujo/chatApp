const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null,path.resolve(__dirname, '..', '..', 'uploads'));
        },
        filename: (req, file, cb) => { 
            crypto.randomBytes(16, (err, hash)=> {
                if(err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            });
        },
    }),
    limits: {
        filename: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMines = [
            'image/jpeg',
            'image/png'
        ];

        if (allowedMines.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'))
        }
    }
};