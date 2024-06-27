const mongoose = require("mongoose");
const { RappelSchema } = require("../../schemas/calendrier/rappel");

const Rappel = mongoose.model("chapitre", RappelSchema);
module.exports = Rappel;
