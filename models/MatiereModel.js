const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChapitreSchema = new Schema({
  intitule: { type: String, required: true },
  description: { type: String, required: true }
});

const MatiereSchema = new Schema({
  intitule: { type: String, enum: ['mathematique', 'physique-chimie', 'SVT', 'français', 'philosophie'], required: true },
  chapitres: [ChapitreSchema]
});

module.exports = mongoose.model('Matiere', MatiereSchema);


