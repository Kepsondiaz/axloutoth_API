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

const storageFile = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/documents");
  },
  filename: (req, file, callback) => {
    console.log(file, "ok");
    const extension = MIME_TYPE_FILE[file.mimetype];
    callback(null, Date.now() + "-" + req.params.id_matiere + "." + extension);
  },
});

module.exports.fileUpload = multer({ storage: storageFile }).single("file");

const storagePicture = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log("Destination Middleware Log:", file);
    callback(null, "public/pictures");
  },
  filename: (req, file, callback) => {
    console.log(file);
    const extension = MIME_TYPE_PICTURE[file.mimetype];
    callback(null, req.params.id + "." + extension);
  },
});

module.exports.pictureUpload = multer({ storage: storagePicture }).single(
  "picture"
);
