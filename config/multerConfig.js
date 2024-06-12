const multer = require('multer');

// Définir le stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Spécifiez le dossier de destination où les fichiers seront enregistrés
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Spécifiez le nom du fichier
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Configurer le middleware multer
const upload = multer({ storage: storage });

module.exports = upload;
