const multer = require('multer');
const path = require('path');
const db = require("../db.js");

const ImageController = () => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/'); // Set the destination folder for uploaded files
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname)); // Set the filename with a timestamp and original extension
        },
    });

    const upload = multer({ storage: storage });

// Handle image upload
    const handleUserImageUpload = (req, res) => {
        const userMail = req.get('token');
        // Assuming 'image' is the name attribute of the file input in the form
        upload.single('image')(req, res, async function (err) {
            if (err) {
                return res.status(500).json({error: err.message});
            }

            // File upload successful
            const imageName = req.file.filename; // Path to the uploaded image
            res.json({message: 'Image uploaded successfully', imageName});
            try {
                const result = await db.query('UPDATE users SET icon = $1 WHERE user_mail = $2', [imageName, userMail]);
            } catch (err) {
                console.error(err);
                return res.status(500).json('Internal Server Error');
            }
        })
    };

    const handleLeagueImageUpload = (req, res) => {
        const userMail = req.get('token');
        // Assuming 'image' is the name attribute of the file input in the form
        upload.single('image')(req, res, async function (err) {
            if (err) {
                return res.status(500).json({error: err.message});
            }

            // File upload successful
            const imageName = req.file.filename; // Path to the uploaded image
            res.json({message: 'Image uploaded successfully', imageName});
            try {

                const userLeagueOwner = await db.query('SELECT * FROM leagues WHERE creator_mail=$1', [userMail]);
                if (userLeagueOwner.rows.length === 0) {
                    return res.status(403).json({success: false, message: 'User not owns the league'})
                }

                const result = await db.query('UPDATE leagues SET icon = $1 WHERE creator_mail = $2', [imageName, userMail]);
            } catch (err) {
                console.error(err);
                return res.status(500).json('Internal Server Error');
            }
        })
    };

// Handle image retrieval
    const handleImageRetrieval = (req, res) => {
        const filename = req.params.filename;
        res.sendFile(path.join(__dirname, '..', 'uploads', filename));
    };

    return {
        handleUserImageUpload,
        handleLeagueImageUpload,
        handleImageRetrieval,
    };

}




module.exports = { ImageController };
