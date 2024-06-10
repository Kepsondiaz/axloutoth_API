const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatiereSchema = new Schema({
  intitule: {
    type: String,
    enum: ['mathematique', 'physique-chimie', 'SVT', 'français', 'philosophie'],
    required: true
  },
  chapitres: [{ type: Schema.Types.ObjectId, ref: 'Chapitre' }],
  isDelete: { type: Boolean, default: false }
});

module.exports = mongoose.model('Matiere', MatiereSchema);
  