const mongoose = require("mongoose");
const { FileSchema } = require("../schemas/file");

const File = mongoose.model("file", FileSchema);
module.exports = File;
