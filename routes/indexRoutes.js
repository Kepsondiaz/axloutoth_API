const express = require('express');
const router = express.Router();
const matiereRoutes = require("./matiereRoutes");
const chapitreRoutes = require("./chapitreRoutes")
const searchRoutes = require("./searchRoutes")
const authRoutes = require("./authRoutes")


router.use("/auth", authRoutes)
router.use("/matieres", matiereRoutes);
router.use("/chapitres", chapitreRoutes);
router.use("/search", searchRoutes);

module.exports = router;

