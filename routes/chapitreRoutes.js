const express = require("express");
const ChapitreController = require("../controllers/api/chapitreController");

const router = express.Router();

router.post('/:matiereId', ChapitreController.createChapitre);
router.post('/search/:matiereId', ChapitreController.searchChapitre);

router.get('/', ChapitreController.getAllChapitres);
router.get('/:chapitreId', ChapitreController.getChapitreById);

router.put('/:chapitreId', ChapitreController.updateChapitre);
router.delete('/:chapitreId', ChapitreController.deleteChapitre);


module.exports = router;
