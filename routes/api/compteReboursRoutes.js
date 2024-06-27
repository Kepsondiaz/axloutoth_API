const express = require('express');
const router = express.Router();
const CompteAReboursController = require('../../controllers/api/compteReboursController');

router.post('/add-bac-date', CompteAReboursController.addBacDate);

router.get('/countdown', CompteAReboursController.getTimeUntilExam);

module.exports = (io) => {
  return router;
};

