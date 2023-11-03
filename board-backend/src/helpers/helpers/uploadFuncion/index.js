const fs = require("fs");

/**
 * Returns a multer disk storage configuration object.
 * @param {Object} multer - The multer module.
 * @param {string} DESTINATION - The destination directory for storing uploaded files.
 * @returns {Object} - The multer disk storage configuration object.
 */
function destinationAndFileName(multer = {}, DESTNATION = "", type = 'pdf') {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            return fs.access(DESTNATION, (error) => {
                if (error) {
                    return fs.mkdir(DESTNATION, (err) => err ? cb(new Error(err?.message)) : cb(null, DESTNATION));
                } else {
                    return cb(null, DESTNATION);
                }
            });
        },
        filename: function (req, file, cb) {
            cb(null, type + "-" + Date.now() + '-' + file.originalname);
        }
    });
}


module.exports = { destinationAndFileName }