const mongoose = require("mongoose");
const { MatiereSchema } = require("../schemas/matiere");

const Matiere = mongoose.model("matiere", MatiereSchema);
module.exports = Matiere;
