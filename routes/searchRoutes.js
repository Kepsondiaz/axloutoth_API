const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/api/SearchController');


router.get('/search', SearchController.search);


module.exports = router;

