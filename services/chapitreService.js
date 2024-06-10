const Chapitre = require("../models/MatiereModel");
const { HttpError } = require('../utils/exceptions');
const { Matiere } = require("../models/MatiereModel");


class ChapitreService {

    static async createChapitre(matiereId, chapitreData) {
        try {
            const chapitre = await Chapitre.create(chapitreData);
            await Matiere.findByIdAndUpdate(matiereId, { $push: { chapitres: chapitre._id } });
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
}

module.exports = ChapitreService;
