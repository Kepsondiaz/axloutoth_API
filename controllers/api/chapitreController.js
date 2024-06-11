const ChapitreService = require("../../services/api/chapitreService.js");
const { HttpError } = require("../../utils/exceptions.js");


class ChapitreController {

    static async createChapitre(req, res) {
        const { matiereId } = req.params; // Extraire l'ID de la matière de l'URL
        const chapitreData = req.body; // Les données du chapitre provenant du corps de la requête

        try {
            const chapitre = await ChapitreService.createChapitre(matiereId, chapitreData);
            res.status(201).json(chapitre);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
    static async getAllChapitres(req, res) {
        try {
            const chapitres = await ChapitreService.getAllChapitres();
            res.json(chapitres);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

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

}

module.exports = ChapitreController;
