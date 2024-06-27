const fs = require('fs');
const path = require('path');
const multer = require('multer');

const MIME_TYPE_FILE = {
  "application/pdf": "pdf",
  "application/msword": "doc",
};

const MIME_TYPE_PICTURE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const MIME_TYPE_AUDIO = {
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/ogg": "ogg",
};

const createDirIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storageFile = multer.diskStorage({
  destination: (req, file, callback) => {
    const dirPath = './public/documents';
    createDirIfNotExists(dirPath);
    callback(null, dirPath);
  },
  filename: (req, file, callback) => {
    console.log(file, "ok");
    const extension = MIME_TYPE_FILE[file.mimetype];
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const storagePicture = multer.diskStorage({
  destination: (req, file, callback) => {
    const dirPath = './public/pictures';
    createDirIfNotExists(dirPath);
    callback(null, dirPath);
  },
  filename: (req, file, callback) => {
    console.log(file);
    const extension = MIME_TYPE_PICTURE[file.mimetype];
    callback(null, req.params.id + "." + extension);
  },
});

const storageAudio = multer.diskStorage({
  destination: (req, file, callback) => {
    const dirPath = path.join(__dirname, '../public/audio');
    createDirIfNotExists(dirPath);
    callback(null, dirPath);
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPE_AUDIO[file.mimetype];
    callback(null, Date.now() + "-" + file.originalname + "." + extension);
  },
});

const fileUpload = multer({ storage: storageFile }).single("file");
const pictureUpload = multer({ storage: storagePicture }).single("image");
const audioUpload = multer({ storage: storageAudio }).single("audio");

module.exports = {
  fileUpload,
  pictureUpload,
  audioUpload,
  MIME_TYPE_FILE,
  MIME_TYPE_AUDIO,
};