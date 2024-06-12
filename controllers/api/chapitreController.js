const ChapitreService = require("../../services/api/chapitreService.js");


class ChapitreController {

    static async createChapitre(req, res) {
        try {
            const { intitule } = req.body; // Récupérer l'intitulé à partir du corps de la demande
            const { matiereId } = req.params; // Récupérer matiereId à partir des paramètres de requête
            const file = req.file; // Récupérer le fichier téléchargé depuis la requête

            // Appelez la méthode createChapitre de ChapitreService pour créer un nouveau chapitre
            const chapitre = await ChapitreService.createChapitre(matiereId, intitule, file);

            // Réponse avec le chapitre créé
            res.status(201).json({ success: true, data: chapitre });
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


    /*
    static async getChapitreById(req, res) {
        const { id } = req.params;
        try {
            const chapitre = await ChapitreService.getChapitreById(id);
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
        const { id } = req.params;
        try {
            const updatedChapitre = await ChapitreService.updateChapitre(id, req.body);
            res.json(updatedChapitre);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    static async deleteChapitre(req, res) {
        const { id } = req.params;
        try {
            const chapitre = await ChapitreService.deleteChapitre(id);
            res.json({ message: `Chapitre supprimé`, chapitre });
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    // Recherche selon un chapitre
    static async searchChapitres(req, res) {
        const { query } = req.query;
        try {
            const chapitres = await ChapitreService.searchChapitres(query);
            res.json(chapitres);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
    */

}

module.exports = ChapitreController;
