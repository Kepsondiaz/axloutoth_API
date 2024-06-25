const express = require('express');
const router = express.Router();
const RappelController = require('../../controllers/calendrier/rappelController');

router.get('/get-all-rappels/:userId', RappelController.getRappels)

router.post('/create-rappel/:userId', RappelController.createRappel);

router.put("/update-rappel/:rappelId", RappelController.updateRappel)




module.exports = router

