const MatiereService = require("../../services/api/matiereService.js");
const { HttpError } = require("../../utils/exceptions.js");


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

  static async searchMatiereByIntitule(req, res) {
    const { intitule } = req.query;
    try {
      // Appel du service pour rechercher la matière par intitulé
      const matieres = await MatiereService.searchMatiereByIntitule(intitule);
      res.json(matieres);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  /* Nouvelle méthode pour la recherche des matières
  static async searchMatieres(req, res) {
    const { query } = req.query;
    try {
      if (!query) {
        // Gérer le cas où aucun terme de recherche n'est fourni
        throw new HttpError(null, 400, 'Veuillez fournir un terme de recherche');
      }

      const matieres = await MatiereService.searchMatieres(query);
      res.json(matieres);
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

module.exports = MatiereController;
