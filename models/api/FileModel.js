const mongoose = require("mongoose");
const { FileSchema } = require("../../schemas/api/file");

const File = mongoose.model("file", FileSchema);
module.exports = File;
