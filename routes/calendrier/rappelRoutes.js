const express = require('express');
const router = express.Router();
const RappelController = require('../../controllers/calendrier/rappelController');

// Ajouter un nouveau rappel
router.post('/rappels/:userId', RappelController.addRappel);

// Récupérer tous les rappels d'un utilisateur
router.get('/rappels/user/:userId', RappelController.getRappelsByUser);

// Récupérer un rappel par son ID
router.get('/rappels/:rappelId', RappelController.getRappelById);

// Mettre à jour un rappel par son ID
router.put('/rappels/:rappelId', RappelController.updateRappel);

// Supprimer un rappel par son ID
router.delete('/rappels/:rappelId', RappelController.deleteRappel);

module.exports = router;
