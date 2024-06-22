const express = require('express');
const router = express.Router();
const MatiereController = require('../../controllers/api/MatiereController');


router.post('/', MatiereController.createMatiere);
router.post('/search', MatiereController.searchMatiereByIntitule);

router.get('/', MatiereController.getAllMatieres);
router.get('/:matiereId', MatiereController.getMatiereById);

router.put('/:matiereId', MatiereController.updateMatiere);
router.delete('/:matiereId', MatiereController.deleteMatiere);


module.exports = router;
