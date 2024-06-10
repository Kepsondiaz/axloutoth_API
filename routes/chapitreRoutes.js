const express = require('express');
const ChapitreController = require('../controllers/chapitreController');
const router = express.Router();

// router.post('/:matiereId/chapitres', ChapitreController.createChapitre);
router.get('/', ChapitreController.getAllChapitres);
router.get('/:id', ChapitreController.getChapitreById);
router.put('/:id', ChapitreController.updateChapitre);
router.delete('/:id', ChapitreController.deleteChapitre);

module.exports = router;
