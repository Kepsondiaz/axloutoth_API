const mongoose = require("mongoose");

const ForumSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  description: {
    type: String,
  },
  matiere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "matiere",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

const skipDeleted = function () {
  this.where({ isDeleted: false });
};

ForumSchema.pre("find", skipDeleted);
ForumSchema.pre("findOne", skipDeleted);
ForumSchema.pre("findById", skipDeleted);
ForumSchema.pre("updateOne", skipDeleted);
ForumSchema.pre("updateMany", skipDeleted);
ForumSchema.pre("findOneAndUpdate", skipDeleted);
ForumSchema.pre("deleteOne", skipDeleted);
ForumSchema.pre("deleteMany", skipDeleted);

module.exports = {
  ForumSchema,
};
