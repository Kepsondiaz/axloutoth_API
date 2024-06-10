const express = require('express');
const router = express.Router();
const matiereRoutes = require("./matiereRoutes");
const chapitreRoutes = require("./chapitreRoutes")


router.use('/matieres', matiereRoutes);
router.use('/chapitres', chapitreRoutes);

module.exports = router;

