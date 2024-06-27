const mongoose = require("mongoose");
const { CompteAReboursSchema } = require("../../schemas/api/compteRebours");

const CompteARebours = mongoose.model("rebours", CompteAReboursSchema);

module.exports = CompteARebours;