const multer = require("multer");

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
};

const storageFile = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/documents");
  },
  filename: (req, file, callback) => {
    console.log(file, "ok");
    const extension = MIME_TYPE_FILE[file.mimetype];

    callback(null, Date.now() + "-" + file.originalname);
  },
});

const storagePicture = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/pictures");
  },
  filename: (req, file, callback) => {
    console.log(file);
    const extension = MIME_TYPE_PICTURE[file.mimetype];
    callback(null, req.params.id + "." + extension);
  },
});

const storageAudio = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../public/audio"));
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPE_AUDIO[file.mimetype];
    callback(null, Date.now() + "-" + file.originalname + "." + extension);
  },
});

const fileUpload = multer({ storage: storageFile }).single("file");
const pictureUpload = multer({ storage: storagePicture }).single("picture");
const audioUpload = multer({ storage: storageAudio }).single("audio");

module.exports = {
  fileUpload,
  pictureUpload,
  audioUpload,
  MIME_TYPE_FILE,
  MIME_TYPE_AUDIO,
};
