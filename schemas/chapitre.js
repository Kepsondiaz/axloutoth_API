const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChapitreSchema = new Schema({
    intitule: { type: String, required: true },
    content_type: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    fileName: { type: String, required: true }, 
    filePath: { type: String, required: true } ,
    user_id: { type: Schema.Types.ObjectId, ref: 'user', required: true }, // Référence à l'utilisateur
    matiere: { type: Schema.Types.ObjectId, ref: 'matiere', required: true }, // Clé etrangers vers Matiere
    isDelete: { type: Boolean, default: false }
});
const skipDeleted = function () {
    this.where({ isDelete: false });
};


ChapitreSchema.pre("find", skipDeleted);
ChapitreSchema.pre("findOne", skipDeleted);
ChapitreSchema.pre("findById", skipDeleted);
ChapitreSchema.pre("updateOne", skipDeleted);
ChapitreSchema.pre("updateMany", skipDeleted);
ChapitreSchema.pre("findOneAndUpdate", skipDeleted);
ChapitreSchema.pre("deleteOne", skipDeleted);
ChapitreSchema.pre("deleteMany", skipDeleted);

module.exports = {
    ChapitreSchema
}

