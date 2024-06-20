const FileService = require("../../services/api/fileService");
const { HttpError } = require("../../utils/exceptions");

const getAllFiles = async (req, res) => {
  try {
    const files = await FileService.getAllFiles();
    res.status(200).json(files);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error("Erreur dans getAllFiles :", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  }
};

const getOneFile = async (req, res) => {
  const fileId = req.params.id;

  try {
    const file = await FileService.getOneFile(fileId);
    res.status(200).json(file);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error("Erreur dans getOneFile :", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  }
};

const addOneFile = async (req, res, matiereId, chapitreId) => {
  try {
    const result = await FileService.addOneFile(req.file, matiereId, chapitreId);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error("Erreur dans addOneFile :", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  }
};

const updateFile = async (req, res) => {
  const fileId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedFile = await FileService.updateFile(fileId, updatedData);
    res.status(200).json(updatedFile);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error("Erreur dans updateFile :", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  }
};

const deleteFile = async (req, res) => {
  const fileId = req.params.id;

  try {
    const result = await FileService.deleteFile(fileId);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error("Erreur dans deleteFile :", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  }
};

module.exports = {
  getAllFiles,
  getOneFile,
  addOneFile,
  updateFile,
  deleteFile,
};
