const express = require('express');
const router = express.Router();
const matiereRoutes = require("./matiereRoutes");


router.use('/matieres', matiereRoutes);

module.exports = router;
