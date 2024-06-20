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

module.exports = {
  FileSchema,
};
