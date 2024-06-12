const { HttpError } = require('../../utils/exceptions');
const Matiere = require("../../models/MatiereModel")


class MatiereService {
  
  static async createMatiere(matiereData) {
    try {
      // Vérifier si une matière avec le même intitulé existe déjà
      const existingMatiere = await Matiere.findOne({
        intitule: matiereData.intitule,
        isDelete: false
      });
      if (existingMatiere) {
        throw new HttpError(null, 400, `La matière ${matiereData.intitule} existe déjà`);
      }

      // Créer une nouvelle matière si elle n'existe pas déjà
      const matiere = await Matiere.create(matiereData);
      return matiere;
    } catch (error) {
      throw new HttpError(error, error.statusCode || 500, error.message || 'Erreur interne du serveur');
    }
  }

  static async getAllMatieres() {
    try {
      return await Matiere.find({ isDelete: false });
    } catch (error) {
      console.error(error);
      throw new HttpError(error, 500, 'Erreur interne du serveur');
    }
  }

  static async getMatiereById(matiereId) {
    try {
      const matiere = await Matiere.findOne({
        _id: matiereId,
        isDelete: false
      });

      if (!matiere) throw new HttpError(null, 404, 'Matière non trouvée');
      return matiere;
    } catch (error) {
      console.error(error);
      throw new HttpError(error, 500, 'Erreur interne du serveur');
    }
  }

  static async updateMatiere(matiereId, updatedMatiereData) {
    try {
      const matiere = await Matiere.findOneAndUpdate({
        _id: matiereId,
        isDelete: false
      },
        updatedMatiereData,
        { new: true }
      );

      if (!matiere) throw new HttpError(null, 404, 'Matière non trouvée');
      return matiere;
    } catch (error) {
      console.error(error);
      throw new HttpError(error, 500, 'Erreur interne du serveur');
    }
  }

  static async deleteMatiere(matiereId) {
    try {
      const matiere = await Matiere.findOneAndUpdate({
        _id: matiereId,
        isDelete: false
      },
        { isDelete: true },
        { new: true }
      );

      if (!matiere) throw new HttpError(null, 404, 'Matière non trouvée');
      return matiere;
    } catch (error) {
      console.error(error);
      throw new HttpError(error, 500, 'Erreur interne du serveur');
    }
  }

  static async searchMatiereByIntitule(intitule) {
    try {
      // Rechercher les matières par intitulé
      const matieres = await Matiere.find({
        intitule: { $regex: new RegExp(intitule, 'i') },
        isDelete: false
      });
      return matieres;
    } catch (error) {
      console.error(error);
      throw new HttpError(error, 500, 'Erreur interne du serveur');
    }
  }

  /* Nouvelle méthode pour la recherche des matières
 static async searchMatieres(query) {
   try {
     return await Matiere.find({
       intitule: { $regex: query, $options: 'i' },
       isDelete: false
     });
   } catch (error) {
     console.error(error);
     throw new HttpError(error, 500, 'Erreur interne du serveur');
   }
 }
 */

}

module.exports = MatiereService;
