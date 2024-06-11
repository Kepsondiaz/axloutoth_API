const { HttpError } = require('../../utils/exceptions');
const Matiere = require("../../models/MatiereModel")
const Chapitre = require("../../models/ChapitreModel")



class SearchService {
    
    static async search(query) {
        try {
          // Recherche dans les matières
          const matieres = await Matiere.find({
            intitule: { $regex: query, $options: 'i' }, 
            isDelete: false
          });
    
          // Recherche dans les chapitres
          const chapitres = await Chapitre.find({
            intitule: { $regex: query, $options: 'i' },
            isDelete: false
          });
    
          return { matieres, chapitres };
        } catch (error) {
          console.error(error);
          throw new HttpError(error, 500, 'Erreur interne du serveur');
        }
    }
}

module.exports = SearchService;
