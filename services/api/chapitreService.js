const Chapitre = require("../../models/ChapitreModel");
const { HttpError } = require('../../utils/exceptions');
const Matiere = require("../../models/MatiereModel");

class ChapitreService {

    static async createChapitre(matiereId, intitule, file) {
        try {
            // Vérifier si la matière existe
            const matiere = await Matiere.findById(matiereId);
            if (!matiere) {
                throw new Error('Matière non trouvée');
            }

            // Traiter le téléchargement de fichier avec Multer
            const fileName = file.filename;
            const filePath = file.path;

            // Créer un nouveau chapitre avec les informations de fichier et de matière
            const chapitre = await Chapitre.create({
                intitule: intitule,
                fileName: fileName,
                filePath: filePath,
                matiere: matiereId
            });

            return chapitre;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getAllChapitres() {
        try {
            return await Chapitre.find();
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }




    /*
    static async createChapitre(matiereId, chapitreData) {
        try {
            // Ajouter l'ID de la matière dans les données du chapitre
            chapitreData.matiere = matiereId;

            // Créer le chapitre avec les données fournies
            const chapitre = await Chapitre.create(chapitreData);

            // Mettre à jour la matière avec l'ID du nouveau chapitre
            await Matiere.findByIdAndUpdate(matiereId, { $push: { chapitres: chapitre._id } });

            // Retourner le chapitre créé
            return chapitre;
        } catch (error) {
            throw new HttpError(error, 400, error.message);
        }
    }


    static async getAllChapitres() {
        try {
            return await Chapitre.find();
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }

    static async getChapitreById(chapitreId) {
        try {
            const chapitre = await Chapitre.findById(chapitreId);

            if (!chapitre) throw new HttpError(null, 404, 'Chapitre non trouvé');
            return chapitre;
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }

    static async updateChapitre(chapitreId, updatedChapitreData) {
        try {
            const chapitre = await Chapitre.findByIdAndUpdate(chapitreId, updatedChapitreData, { new: true });

            if (!chapitre) throw new HttpError(null, 404, 'Chapitre non trouvé');
            return chapitre;
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }

    static async deleteChapitre(chapitreId) {
        try {
            const chapitre = await Chapitre.findByIdAndDelete(chapitreId);

            if (!chapitre) throw new HttpError(null, 404, 'Chapitre non trouvé');
            await Matiere.updateMany({}, { $pull: { chapitres: chapitreId } });
            return chapitre;
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }

    static async searchChapitres(query) {
        try {
            return await Chapitre.find({
                intitule: { $regex: query, $options: 'i' }, // Recherche insensible à la casse
                isDelete: false
            });
        } catch (error) {
            console.error(error);
            throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }
    
    */
}

module.exports = ChapitreService;
