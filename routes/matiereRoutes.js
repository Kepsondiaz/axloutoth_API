const express = require('express');
const router = express.Router();
const MatiereController = require('../controllers/api/MatiereController');
const ChapitreController = require("../controllers/api/chapitreController")


router.get('/', MatiereController.getAllMatieres);
router.get('/:id', MatiereController.getMatiereById);
router.post('/', MatiereController.createMatiere);
router.put('/:id', MatiereController.updateMatiere);
router.delete('/:id', MatiereController.deleteMatiere);
router.post('/:matiereId/chapitres', ChapitreController.createChapitre);
router.get('/matieres/search', MatiereController.searchMatiereByIntitule); // Nouvelle route pour la recherche des matières


module.exports = router;

