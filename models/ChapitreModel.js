const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChapitreSchema = new Schema({
    intitule: { type: String, required: true },
    description: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ['pdf', 'audio', 'texte']
    },
    matiere: { type: Schema.Types.ObjectId, ref: 'Matiere', required: true } // Clé etrangers vers Matiere
});

ChapitreSchema.path('type').validate(function (value) {
    if (['mathematique', 'physique-chimie', 'SVT'].includes(this.matiere)) {
        return ['pdf', 'texte'].includes(value);
    } else if (['français', 'philosophie'].includes(this.matiere)) {
        return ['audio', 'texte'].includes(value);
    }
    return true;
}, 'Le type doit être pdf ou texte pour les matières scientifiques et audio ou texte pour les matières littéraires.');

module.exports = mongoose.model('Chapitre', ChapitreSchema);
