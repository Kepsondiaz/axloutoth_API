const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({

  filepath: {
    type: String,
    required: true,
    unique: false,
  },

  size: {
    type: String,
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

FileSchema.pre("find", skipDeleted);
FileSchema.pre("findOne", skipDeleted);
FileSchema.pre("findById", skipDeleted);
FileSchema.pre("updateOne", skipDeleted);
FileSchema.pre("updateMany", skipDeleted);
FileSchema.pre("findOneAndUpdate", skipDeleted);
FileSchema.pre("deleteOne", skipDeleted);
FileSchema.pre("deleteMany", skipDeleted);


module.exports = {
  FileSchema,
};
