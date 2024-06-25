const express = require("express");
const router = express.Router();
const matiereRoutes = require("./api/matiereRoutes");
const chapitreRoutes = require("./api/chapitreRoutes");
const searchRoutes = require("./api/searchRoutes");
const authRoutes = require("./auth/authRoutes");
const fileRoutes = require("./api/fileRoutes");
const forumRoutes = require("./socket/forumRoutes");
const questionRoutes = require("./socket/questionRoutes")
const compteARebours = require("./api/compteReboursRoutes")
const rappelCalendrier = require("./calendrier/rappelRoutes")

//router.use("/calendrier", rappelCalendrier)

/*

router.use("/matieres", matiereRoutes);
*/
router.use("/auth", authRoutes);
router.use("/forum", forumRoutes);
router.use("/question",questionRoutes)



/*

router.use("/chapitres", chapitreRoutes);
router.use("/search", searchRoutes);
router.use("/file", fileRoutes);


router.use("/question",questionRoutes)
router.use("/compteARebours", compteARebours)
*/


module.exports = (io) => {
  return router;
};

