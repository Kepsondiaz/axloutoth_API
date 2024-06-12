const mongoose = require("mongoose");
const { ChapitreSchema } = require("../schemas/chapitre");

const Chapitre = mongoose.model("chapitre", ChapitreSchema);
module.exports = Chapitre;
