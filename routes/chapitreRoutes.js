const express = require('express');
const ChapitreController = require('../controllers/api/chapitreController');
const router = express.Router();

router.post('/:matiereId/chapitres', ChapitreController.createChapitre);
router.get('/', ChapitreController.getAllChapitres);
router.get('/:id', ChapitreController.getChapitreById);
router.put('/:id', ChapitreController.updateChapitre);
router.delete('/:id', ChapitreController.deleteChapitre);
router.get('/search', ChapitreController.searchChapitres); // Recherche d'un chapitre


module.exports = router;
