const SearchService = require("../../services/api/searchService.js");
const { HttpError } = require("../../utils/exceptions.js");

class SearchController {

  static async search(req, res) {

    const { intitule } = req.body;

    if (!intitule) {
      return res.status(400).json({ erreur: 'Intitulé est requis' });
    }

    try {
      const results = await SearchService.search(intitule);

      if (results.length === 0) {
        return res.status(404).json({ erreur: 'Aucun résultat trouvé' });
      }

      return res.json(results);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erreur: 'Erreur interne du serveur' });
    }
  }

}

module.exports = SearchController;
