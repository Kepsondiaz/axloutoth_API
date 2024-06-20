const FileModel = require("../../models/FileModel");
const MatiereModel = require("../../models/MatiereModel");
const ChapitreModel = require("../../models/ChapitreModel");
const { ObjectId } = require("mongodb");
const { HttpError } = require("../../utils/exceptions");
const {
  MIME_TYPE_FILE,
  MIME_TYPE_AUDIO,
} = require("../../config/multerConfig");

class FileService {
  static async getAllFiles() {
    try {
      const files = await FileModel.find();
      return files;
    } catch (error) {
      throw new HttpError(
        error,
        500,
        "Erreur lors de la récupération des fichiers"
      );
    }
  }

  static async getOneFile(id) {
    if (!ObjectId.isValid(id)) throw new HttpError(null, 400, "ID invalide");

    try {
      const file = await FileModel.findById(id);
      if (!file) throw new HttpError(null, 404, "Fichier non trouvé");
      return file;
    } catch (error) {
      throw new HttpError(
        error,
        500,
        "Erreur lors de la récupération du fichier"
      );
    }
  }

  static async addFile(reqFile, matiereId, chapitreId) {
    try {
      if (!reqFile) throw new HttpError(null, 400, "Aucun fichier téléchargé");

      const matiere = await MatiereModel.findById(matiereId);
      if (!matiere) throw new HttpError(null, 404, "Matière non trouvée");

      const chapitre = await ChapitreModel.findById(chapitreId);
      if (!chapitre) throw new HttpError(null, 404, "Chapitre non trouvé");

      const typeMatiere = [
        "mathematique",
        "physique",
        "chimie",
        "SVT",
      ].includes(matiere.intitule.toLowerCase())
        ? "scientifique"
        : "litteraire";

      let allowedExtensions;
      if (typeMatiere === "scientifique") {
        console.log(MIME_TYPE_FILE);
        allowedExtensions = Object.values(MIME_TYPE_FILE);
      } else {
        allowedExtensions = [
          ...Object.values(MIME_TYPE_FILE),
          ...Object.values(MIME_TYPE_AUDIO),
        ];
      }

      const fileMimeType = reqFile.mimetype;
      const fileExtension =
        fileMimeType &&
        allowedExtensions.find((ext) => ext === fileMimeType.split("/")[1]);

      if (!fileExtension) {
        throw new HttpError(
          null,
          400,
          `Extension de fichier non supportée pour une matière ${typeMatiere}`
        );
      }

      const file = await FileModel.create({
        size: reqFile.size,
        filepath: `${reqFile.path}`,
      });

      matiere.files.push(file._id);
      chapitre.files.push(file._id);

      await matiere.save();
      await chapitre.save();

      return { file, matiere, chapitre };
    } catch (error) {
      throw new HttpError(
        error,
        error.statusCode || 500,
        error.message || "Erreur lors de l'ajout du fichier"
      );
    }
  }

  static async updateFile(id, updatedData) {
    if (!ObjectId.isValid(id)) throw new HttpError(null, 400, "ID invalide");

    try {
      const file = await FileModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      if (!file) throw new HttpError(null, 404, "Fichier non trouvé");
      return file;
    } catch (error) {
      throw new HttpError(
        error,
        500,
        "Erreur lors de la mise à jour du fichier"
      );
    }
  }

  static async deleteFile(id) {
    if (!ObjectId.isValid(id)) throw new HttpError(null, 400, "ID invalide");

    try {
      const file = await FileModel.findByIdAndDelete(id);
      if (!file) throw new HttpError(null, 404, "Fichier non trouvé");
      return { message: "Fichier supprimé avec succès" };
    } catch (error) {
      throw new HttpError(
        error,
        500,
        "Erreur lors de la suppression du fichier"
      );
    }
  }
}

module.exports = FileService;
