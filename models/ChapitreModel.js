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
    matiere: { type: Schema.Types.ObjectId, ref: 'Matiere', required: true }
});

ChapitreSchema.path('type').validate(function (value) {
    if (['mathematique', 'physique-chimie', 'SVT'].includes(this.matiere)) {
        return ['pdf', 'texte'].includes(value);
    } else if (['français', 'philosophie'].includes(this.matiere)) {
        return ['audio', 'texte'].includes(value);
    }
    return true;
}, 'Type must be pdf or texte for scientific subjects and audio or texte for literary subjects.');

module.exports = mongoose.model('Chapitre', ChapitreSchema);
