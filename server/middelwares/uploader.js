const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/assets/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ".jpg")
    }
});

module.exports = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'image/jpeg') {
            return cb({ status: 400,message: 'invalid file, only .jpg images are allowed'}, false);
        }
        cb(null, true);
    },
});