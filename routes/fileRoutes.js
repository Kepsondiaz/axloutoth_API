const express = require("express");
const router = express.Router();
const path = require("path");
const {
  deleteFile,
  updateFile,
  getOneFile,
  getAllFiles,
  addOneFile,
} = require("../controllers/api/fileController");
const { fileUpload } = require("../config/multerConfig");

router.get("/", (req, res) => {
  res.send("file");
});

router.get("/get/all", getAllFiles);
router.get("/get/:id", getOneFile);

router.post(
  "/add/",
  fileUpload,
  express.static(path.join(__dirname, "public/documents")),
  addOneFile
);

// router.put("/update/:id", updateFile);
// router.delete("/del/:id", deleteFile);

module.exports = router;
