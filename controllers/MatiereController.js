const MatiereService = require("../services/matiereService");
const { HttpError } = require('../utils/exceptions');

class MatiereController {
  static async createMatiere(req, res) {
    try {
      const matiere = await MatiereService.createMatiere(req.body);
      res.status(201).json(matiere);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async getAllMatieres(req, res) {
    try {
      const matieres = await MatiereService.getAllMatieres();
      res.json(matieres);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async getMatiereById(req, res) {
    const { id } = req.params;
    try {
      const matiere = await MatiereService.getMatiereById(id);
      res.json(matiere);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async updateMatiere(req, res) {
    const { id } = req.params;
    try {
      const updatedMatiere = await MatiereService.updateMatiere(id, req.body);
      res.json(updatedMatiere);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async deleteMatiere(req, res) {
    const { id } = req.params;
    try {
      const matiere = await MatiereService.getMatiereById(id);
      if (!matiere) throw new HttpError(null, 404, 'Matière non trouvée');

      await MatiereService.deleteMatiere(id);
      res.json({ message: `Matière ${matiere.intitule} supprimée` });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

module.exports = MatiereController;
