const express = require('express');
const router = express.Router();
const MatiereController = require('../controllers/MatiereController');

router.post('/', MatiereController.createMatiere);
router.get('/', MatiereController.getAllMatieres);
router.get('/:id', MatiereController.getMatiereById);
router.put('/:id', MatiereController.updateMatiere);
router.delete('/:id', MatiereController.deleteMatiere);

router.post('/:id/chapitres', MatiereController.addChapitreToMatiere); // Ajouter un chapitre à une matière existante
router.put('/:matiereId/chapitres/:chapitreId', MatiereController.updateChapitreInMatiere); // Mise a jour d'un chapitre 
router.delete('/:matiereId/chapitres/:chapitreId', MatiereController.deleteChapitreFromMatiere); // Supession d'un chapitre

module.exports = router;
