const express = require('express');
const router = express.Router();
const SearchController = require('../../controllers/api/SearchController');


router.post('/', SearchController.search);


module.exports = router;

