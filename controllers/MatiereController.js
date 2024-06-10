const MatiereService = require("../services/matiereService")

class MatiereController {
  static async createMatiere(req, res) {
    try {
      const matiere = await MatiereService.createMatiere(req.body);
      res.status(201).json(matiere);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async getAllMatieres(req, res) {
    try {
      const matieres = await MatiereService.getAllMatieres();
      res.json(matieres);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async getMatiereById(req, res) {
    try {
      const matiere = await MatiereService.getMatiereById(req.params.id);
      res.json(matiere);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async updateMatiere(req, res) {
    try {
      const matiere = await MatiereService.updateMatiere(req.params.id, req.body);
      res.json(matiere);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async deleteMatiere(req, res) {
  try {
    const matiereId = req.params.id;

    // Récupérer la matière par son ID pour obtenir son nom
    const matiere = await MatiereService.getMatiereById(matiereId);
    if (!matiere) throw new HttpError(null, 404, 'Matière non trouvée');

    // Supprimer la matière
    await MatiereService.deleteMatiere(matiereId);

    // Utilisez le nom de la matière dans la réponse JSON
    res.json({ message: `Matière ${matiere.intitule} supprimée` });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

  static addChapitreToMatiere = async (req, res) => {
    try {
      const matiereId = req.params.id;
      const chapitreData = req.body;
      const matiere = await MatiereService.addChapitreToMatiere(matiereId, chapitreData);
      res.status(201).json(matiere);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }


  static async updateChapitreInMatiere(req, res) {
    try {
      const matiereId = req.params.matiereId;
      const chapitreId = req.params.chapitreId;
      const updatedChapitreData = req.body;
      const matiere = await MatiereService.updateChapitreInMatiere(matiereId, chapitreId, updatedChapitreData);
      res.json(matiere);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async deleteChapitreFromMatiere(req, res) {
    try {
      const matiereId = req.params.matiereId;
      const chapitreId = req.params.chapitreId;
  
      // Récupérer la matière par son ID
      const matiere = await MatiereService.getMatiereById(matiereId);
      if (!matiere) throw new HttpError(null, 404, 'Matière non trouvée');
  
      // Supprimer le chapitre de la matière
      await MatiereService.deleteChapitreFromMatiere(matiereId, chapitreId);
  
      // Utilisez le nom de la matière dans la réponse JSON
      res.json({ message: `Chapitre supprimé de la matière ${matiere.intitule}` });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
  
}

module.exports = MatiereController;
