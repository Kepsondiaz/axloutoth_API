const Matiere = require("../models/MatiereModel");
const { HttpError } = require('../utils/exceptions');


class MatiereService {

  static async createMatiere(matiereData) {
    try {
      const existingMatiere = await Matiere.findOne({ intitule: matiereData.intitule });
      if (existingMatiere) {
        throw new HttpError(null, 409, 'Cette matière existe déjà');
      }
  
      const matiere = new Matiere(matiereData);
      return await matiere.save();
    } catch (error) {
      console.error(error);
      throw new HttpError(error, 500, 'Erreur interne du serveur');
    }
  }

  static async getAllMatieres() {
    try {
      return await Matiere.find();
    } catch (error) {
      console.error(error);
      throw new HttpError(error, 500, 'Erreur interne du serveur');
    }
  }

  static async getMatiereById(id) {
    try {
      const matiere = await Matiere.findById(id);
      if (!matiere) throw new HttpError(null, 404, 'Matière non trouvée');
      return matiere;
    } catch (error) {
      console.error(error);
      throw new HttpError(error, 500, 'Erreur interne du serveur');
    }
  }

  static async updateMatiere(id, updatedMatiereData) {
    try {
      const matiere = await Matiere.findByIdAndUpdate(id, updatedMatiereData, { new: true });
      if (!matiere) throw new HttpError(null, 404, 'Matière non trouvée');
      return matiere;
    } catch (error) {
      console.error(error);
      throw new HttpError(error, 500, 'Erreur interne du serveur');
    }
  }

  static async deleteMatiere(id) {
    try {
      const matiere = await Matiere.findByIdAndDelete(id);
      if (!matiere) throw new HttpError(null, 404, 'Matière non trouvée');
      return matiere;
    } catch (error) {
      console.error(error);
      throw new HttpError(error, 500, 'Erreur interne du serveur');
    }
  }

  static addChapitreToMatiere = async (matiereId, chapitreData) => {
    try {
      const matiere = await Matiere.findById(matiereId);
      if (!matiere) throw new HttpError(null, 404, 'Matière non trouvée');

      matiere.chapitres.push(chapitreData);
      await matiere.save();
      return matiere;
    } catch (error) {
      console.error(error);
      throw new HttpError(error, 500, 'Erreur interne du serveur');
    }
  }


  static async updateChapitreInMatiere(matiereId, chapitreId, updatedChapitreData) {
    try {
      const matiere = await Matiere.findById(matiereId);
      if (!matiere) throw new HttpError(null, 404, 'Matière non trouvée');

      const chapitre = matiere.chapitres.id(chapitreId);
      if (!chapitre) throw new HttpError(null, 404, 'Chapitre non trouvé');

      chapitre.set(updatedChapitreData);
      await matiere.save();
      return matiere;
    } catch (error) {
      console.error(error);
      throw new HttpError(error, 500, 'Erreur interne du serveur');
    }
  }

 static async deleteChapitreFromMatiere(matiereId, chapitreId) {
  try {
    const matiere = await Matiere.findById(matiereId);
    if (!matiere) throw new HttpError(null, 404, 'Matière non trouvée');

    matiere.chapitres.pull({ _id: chapitreId }); // Utilisation de pull pour supprimer le sous-document du tableau
    await matiere.save();
    return matiere;
  } catch (error) {
    console.error(error);
    throw new HttpError(error, 500, 'Erreur interne du serveur');
  }
}

}

module.exports = MatiereService;
