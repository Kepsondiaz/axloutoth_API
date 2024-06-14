const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatiereTypes = Object.freeze({
  MATHEMATIQUE: "mathematique",
  PHYSIQUE: "physique",
  CHIMIE: "chimie",
  SVT: "SVT",
  FRANCAIS: "français",
  PHILOSOPHIE: "philosophie",
});

const MatiereSchema = new Schema({
  intitule: {
    type: String,
    enum: Object.values(MatiereTypes),
    required: true,
  },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "file" }],
  chapitres: [{ type: Schema.Types.ObjectId, ref: "chapitre" }], // Référence aux chapitres associés
  isDelete: { type: Boolean, default: false },
});

const skipDeleted = function () {
  this.where({ isDelete: false });
};

MatiereSchema.pre("find", skipDeleted);
MatiereSchema.pre("findOne", skipDeleted);
MatiereSchema.pre("findById", skipDeleted);
MatiereSchema.pre("updateOne", skipDeleted);
MatiereSchema.pre("updateMany", skipDeleted);
MatiereSchema.pre("findOneAndUpdate", skipDeleted);
MatiereSchema.pre("deleteOne", skipDeleted);
MatiereSchema.pre("deleteMany", skipDeleted);

module.exports = {
  MatiereSchema,
  MatiereTypes,
};
