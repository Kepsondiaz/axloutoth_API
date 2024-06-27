const mongoose = require('mongoose');
const Chapitre = require("../../models/api/ChapitreModel");
const { HttpError } = require('../../utils/exceptions');
const Matiere = require("../../models/api/MatiereModel");


class ChapitreService {

    static async createChapitre(matiereId, intitule) {
        try {
            // Vérifier si la matière existe
            const matiere = await Matiere.findById(matiereId);
            if (!matiere) {
                throw new Error('Matière non trouvée');
            }

            // Créer un nouveau chapitre avec les informations fournies
            const chapitre = await Chapitre.create({
                intitule: intitule,
                matiere: matiereId
            });

            // Mettre à jour la matière avec l'ID du nouveau chapitre
            await Matiere.findByIdAndUpdate(matiereId, { $push: { chapitres: chapitre._id } });

            return chapitre;
        } catch (error) {
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }

    static async getAllChapitres() {

        try {
            return await Chapitre.find().populate('matiere', 'intitule'); 
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }

    static async getMatiereById(matiereId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(matiereId)) {
                throw new HttpError(null, 400, 'ID de matière invalide');
            }
            
            const matiere = await Matiere.findById(matiereId);
            if (!matiere) {
                throw new HttpError(null, 404, 'Matière non trouvée');
            }

            return matiere;

        } catch (error) {
            console.error(error);
            throw new HttpError(error, error.statusCode || 500, error.message || 'Erreur interne du serveur');
        }
    }


    static async updateChapitre(chapitreId, updatedChapitreData) {
        try {
            const chapitre = await Chapitre.findByIdAndUpdate(chapitreId, 
                updatedChapitreData, 
                { new: true }).populate('matiere', 'intitule');

            if (!chapitre) throw new HttpError(null, 404, 'Chapitre non trouvé');
            return chapitre;
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }

    static async deleteChapitre(chapitreId) {
        try {
            const chapitre = await Chapitre.findByIdAndDelete(chapitreId).populate('matiere', 'intitule');
            if (!chapitre) throw new HttpError(null, 404, 'Chapitre non trouvé');
            
            // Supprimer l'ID du chapitre de la liste des chapitres de la matière
            await Matiere.findByIdAndUpdate(chapitre.matiere, { $pull: { chapitres: chapitreId } });

            return chapitre;
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }

    

    
    static async searchChapitre(intitule) {
        try {
          const chapitres = await Chapitre.find({
            intitule: { $regex: new RegExp(intitule, 'i') },
            isDelete: false
          }).populate('matiere', 'intitule');
          return chapitres;
        } catch (error) {
          console.error(error);
          throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }
}

module.exports = ChapitreService;
