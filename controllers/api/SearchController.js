const SearchService = require("../../services/api/searchService.js");
const { HttpError } = require("../../utils/exceptions.js");

class SearchController {

  static async search(req, res) {
    const { query } = req.query;
    try {
      const result = await SearchService.search(query);
      res.json(result);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

}

module.exports = SearchController;
