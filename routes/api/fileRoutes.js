const express = require("express");
const router = express.Router();
const path = require("path");
const {
  deleteFile,
  updateFile,
  getOneFile,
  getAllFiles,
  addOneFile,
} = require("../../controllers/api/fileController");

const { fileUpload } = require("../../config/multerConfig");
const { downloadFile } = require("../../services/api/fileService");

// Route pour ajouter un fichier
router.post(
  "/add-file/:matiereId/:chapitreId",
  fileUpload,
  (req, res) => {
    const { matiereId, chapitreId } = req.params;
    addOneFile(req, res, matiereId, chapitreId);
  }
);

// Route principale des fichiers
router.get("/", (req, res) => {
  res.send("Bienvenue dans la gestion des fichiers");
});

// Route pour obtenir tous les fichiers
router.get("/getAll-files", getAllFiles);

// Route pour obtenir un fichier par ID
router.get("/get-file/:id", getOneFile);

// Route pour mettre à jour un fichier par ID
router.put("/update-file/:id", updateFile);

// Route pour supprimer un fichier par ID
router.delete("/delete-file/:id", deleteFile);

// Route pour teleecharger un fichier par ID
router.get("/download-file/:id", downloadFile)


module.exports = router;
