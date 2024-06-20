const { HttpError } = require('../../utils/exceptions');
const MatiereService = require("../../services/api/matiereService.js");

class MatiereController {
  
  static async createMatiere(req, res) {
    try {
      const { intitule } = req.body;
      
      // Créer une matière en passant l'intitulé et les autres données par défaut
      const matiere = await MatiereService.createMatiere({ intitule });

      res.status(201).json({
        success: true,
        message: "Matière créée avec succès",
        data: matiere
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ 
          success: false,
          error: error.message 
        });
      } else {
        console.error(error);
        res.status(500).json({ error: "Erreur interne du serveur" });
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
        console.error(error);
        res.status(500).json({ error: "Erreur interne du serveur" });
      }
    }
  }

  static async getMatiereById(req, res) {
    const { matiereId } = req.params;
    try {
      const matiere = await MatiereService.getMatiereById(matiereId);
      res.json(matiere);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: "Erreur interne du serveur" });
      }
    }
  }

  static async updateMatiere(req, res) {
    const { matiereId } = req.params;
    const { intitule } = req.body;

    try {
      // Vérifier que le nouvel intitulé est présent dans le corps de la requête
      if (!intitule) {
        throw new HttpError(null, 400, "Le nouvel intitulé est requis pour mettre à jour une matière");
      }

      const updatedMatiere = await MatiereService.updateMatiere(matiereId, { intitule });

      if (!updatedMatiere) {
        throw new HttpError(null, 404, "Matière non trouvée");
      }

      res.json({
        success: true,
        message: "Matière mise à jour avec succès",
        data: updatedMatiere
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ 
          success: false,
          error: error.message
        });
      } else {
        console.error(error);
        res.status(500).json({ error: "Erreur interne du serveur" });
      }
    }
  }

  static async deleteMatiere(req, res) {
    const { matiereId } = req.params;
    try {
      const deletedMatiere = await MatiereService.deleteMatiere(matiereId);

      if (!deletedMatiere) {
        throw new HttpError(null, 404, "Matière non trouvée");
      }

      res.json({ message: `Matière ${deletedMatiere.intitule} supprimée` });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: "Erreur interne du serveur" });
      }
    }
  }


  static async searchMatiereByIntitule(req, res) {

    const { intitule } = req.body;

    try {
      if (!intitule) {
        throw new HttpError(null, 400, "L'intitulé de la matière est requis pour la recherche");
      }

      const matieres = await MatiereService.searchMatiereByIntitule(intitule);

      if (matieres.length === 0) {
        return res.status(404).json({ message: `Aucune matière avec l'intitulé ${intitule} trouvée` });
      }

      res.json(matieres);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: "Erreur interne du serveur" });
      }
    }
  }
}

module.exports = MatiereController;
