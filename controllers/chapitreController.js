const ChapitreService = require("../services/chapitreService");
const { HttpError } = require('../utils/exceptions');

class ChapitreController {
    static async createChapitre(req, res) {
        const { matiereId } = req.params;
        try {
            const chapitre = await ChapitreService.createChapitre(matiereId, req.body);
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
}

module.exports = ChapitreController;
