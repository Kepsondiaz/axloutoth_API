const { HttpError } = require('../../utils/exceptions');
const MatiereService = require('./matiereService');
const ChapitreService = require('./chapitreService')



class SearchService {
    
  static async search(intitule) {
    try {
      const matieres = await MatiereService.searchMatiereByIntitule(intitule);
      const chapitres = await ChapitreService.searchChapitre(intitule);

      return [...matieres, ...chapitres];
    } catch (error) {
      console.error(`Erreur lors de la recherche : ${error.message}`);
      throw error;
    }
  }
}

module.exports = SearchService;
