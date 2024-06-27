const mongoose = require("mongoose");
const { RappelSchema } = require("../../schemas/calendrier/rappel");

const Rappel = mongoose.model("rappel", RappelSchema);
module.exports = Rappel;
