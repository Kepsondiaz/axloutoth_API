const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    maxlength: 50,
    unique: false,
  },
  size: {
    type: String,
  },
  filepath: {
    type: String,
    required: true,
    unique: false,
  },
});

module.exports = {
  FileSchema,
};
