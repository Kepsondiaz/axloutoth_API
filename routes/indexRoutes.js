const express = require("express");
const router = express.Router();
const matiereRoutes = require("./api/matiereRoutes");
const chapitreRoutes = require("./api/chapitreRoutes");
const searchRoutes = require("./api/searchRoutes");
const authRoutes = require("./auth/authRoutes");
const fileRoutes = require("./api/fileRoutes");
const forumRoutes = require("./socket/forumRoutes");
const questionRoutes = require("./socket/questionRoutes")


router.use("/auth", authRoutes);
router.use("/matieres", matiereRoutes);
/*
router.use("/chapitres", chapitreRoutes);
router.use("/search", searchRoutes);
router.use("/file", fileRoutes);
*/
router.use("/forum", forumRoutes);
router.use("/question",questionRoutes)


module.exports = (io) => {
  return router;
};

