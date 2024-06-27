const FileModel = require("../../models/api/FileModel");
const MatiereModel = require("../../models/api/MatiereModel");
const ChapitreModel = require("../../models/api/ChapitreModel");
const { ObjectId } = require("mongodb");
const { HttpError } = require("../../utils/exceptions");
const { SCIENTIFIC_SUBJECTS, LITERARY_SUBJECTS } = require("../../utils/enumeration")
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

  static async addOneFile(reqFile, matiereId, chapitreId) {

    try {
      if (!reqFile) throw new HttpError(null, 400, "Aucun fichier téléchargé");

      const matiere = await MatiereModel.findById(matiereId);
      if (!matiere) throw new HttpError(null, 404, "Matière non trouvée");

      const chapitre = await ChapitreModel.findById(chapitreId);
      if (!chapitre) throw new HttpError(null, 404, "Chapitre non trouvé");

      const typeMatiere = SCIENTIFIC_SUBJECTS.includes(matiere.intitule.toLowerCase())
        ? "scientifique"
        : LITERARY_SUBJECTS.includes(matiere.intitule.toLowerCase())
        ? "littéraire"
        : null;

      if (!typeMatiere) {
        throw new HttpError(null, 400, "Type de matière non supporté");
      }

      let allowedMimeTypes;

      if (typeMatiere === "scientifique") {

        allowedMimeTypes = [MIME_TYPE_FILE["application/pdf"]];

      } else {
        allowedMimeTypes = [

          MIME_TYPE_FILE["application/pdf"],
          MIME_TYPE_AUDIO["audio/mpeg"],
          MIME_TYPE_AUDIO["audio/wav"],
          MIME_TYPE_AUDIO["audio/ogg"],
          
        ];
      }

      const fileMimeType = reqFile.mimetype;
      const isAllowedMimeType = allowedMimeTypes.includes(fileMimeType);

      if (!isAllowedMimeType) {
        throw new HttpError(
          null,
          400,
          `Extension de fichier non supportée pour une matière ${typeMatiere}`
        );
      }

      const file = await FileModel.create({
        size: reqFile.size,
        filepath: `${reqFile.path}`,
        mimetype: fileMimeType,
      });

      matiere.files.push(file._id);
      chapitre.files.push(file._id);

      await matiere.save();
      await chapitre.save();

      return { file, matiere, chapitre };
    } catch (error) {
      console.error(error);
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


  static async downloadFile(id) {
    
    if (!ObjectId.isValid(id)) {
      throw new HttpError(null, 400, "ID invalide");
    }

    try {
      const file = await FileModel.findById(id);
      if (!file) {
        throw new HttpError(null, 404, "Fichier non trouvé");
      }

      return {
        success: true,
        message: "Fichier téléchargé avec succès",
        data: file
      };
    } catch (error) {
      throw new HttpError(
        error,
        error.statusCode || 500,
        error.message || "Erreur lors du téléchargement du fichier"
      );
    }
  }
}

module.exports = FileService;