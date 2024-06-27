const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChapitreSchema = new Schema({
    intitule: { type: String, required: true },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "file" }],
    matiere: { type: mongoose.Schema.Types.ObjectId, ref: 'matiere', required: true },
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

