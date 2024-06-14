const express = require("express");
const router = express.Router();
const matiereRoutes = require("./matiereRoutes");
const chapitreRoutes = require("./chapitreRoutes");
const searchRoutes = require("./searchRoutes");
const authRoutes = require("./authRoutes");
const fileRoutes = require("./fileRoutes");

router.use("/auth", authRoutes);
router.use("/matieres", matiereRoutes);
router.use("/chapitres", chapitreRoutes);
router.use("/search", searchRoutes);
router.use("/file", fileRoutes);

module.exports = router;
