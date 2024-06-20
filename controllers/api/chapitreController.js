const mongoose = require('mongoose');
const ChapitreService = require("../../services/api/chapitreService.js");
const {HttpError} = require("../../utils/exceptions.js")


class ChapitreController {

    static async createChapitre(req, res) {
        try {
            const { intitule } = req.body; 
            const { matiereId } = req.params; 

            // Appelez la méthode createChapitre de ChapitreService pour créer un nouveau chapitre
            const chapitre = await ChapitreService.createChapitre(matiereId, intitule);

            // Réponse avec le chapitre créé
            res.status(201).json({ 

                success: true, 
                message: "Chapitre enregistré avec succès",
                data: chapitre 
            
            });
        } catch (error) {
            // Gestion des erreurs
            console.error(error);
            res.status(500).json({ success: false, error: 'Erreur interne du serveur' });
        }
    }

    static async getAllChapitres(req, res) {
        try {
            // Appelez la méthode getAllChapitres de ChapitreService pour récupérer tous les chapitres
            const chapitres = await ChapitreService.getAllChapitres();

            // Réponse avec la liste des chapitres
            res.status(200).json({ success: true, data: chapitres });
        } catch (error) {
            // Gestion des erreurs
            console.error(error);
            res.status(500).json({ success: false, error: 'Erreur interne du serveur' });
        }
    }

    static async getChapitreById(req, res) {

        const { chapitreId } = req.params; 
        try {
            const chapitre = await ChapitreService.getChapitreById(chapitreId);
            res.json(chapitre);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }


    static async updateChapitre(req, res) {

        const { chapitreId } = req.params; 
        const { nouveau_intitule } = req.body; 
        try {
            if (!nouveau_intitule) {
                throw new HttpError(null, 400, 'Le nouveau intitulé est requis pour mettre à jour un chapitre');
            }

            const updatedChapitre = await ChapitreService.updateChapitre(chapitreId, { intitule: nouveau_intitule });

            res.json({
                success: true,
                message: "Chapitre mis à jour avec succès",
                data: updatedChapitre
            });
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: 'Erreur interne du serveur' });
            }
        }
    }

    static async deleteChapitre(req, res) {
        const { chapitreId } = req.params; 
        try {
            const chapitre = await ChapitreService.deleteChapitre(chapitreId);
            res.json({ message: `Chapitre supprimé`, chapitre });
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    static async searchChapitre(req, res) {
        const { intitule } = req.body;
        const { matiereId } = req.params;

        try {
            // Vérifier si matiereId est un ObjectId valide
            if (!mongoose.Types.ObjectId.isValid(matiereId)) {
                throw new HttpError(null, 400, 'ID de matière invalide');
            }

            // Appeler la méthode de service pour rechercher les chapitres
            const chapitres = await ChapitreService.searchChapitre(intitule, matiereId);

            // Vérifier s'il y a des résultats
            if (chapitres.length === 0) {
                return res.status(404).json({ message: 'Aucun chapitre avec cet intitulé pour cette matière' });
            }

            // Retourner les résultats
            res.json(chapitres);

        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                console.error(error);
                res.status(500).json({ error: 'Erreur interne du serveur' });
            }
        }
    }

}

module.exports = ChapitreController;
