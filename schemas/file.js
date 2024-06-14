const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true,
  },
  size: {
    type: String,
  },
  filepath: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = {
  FileSchema,
};
