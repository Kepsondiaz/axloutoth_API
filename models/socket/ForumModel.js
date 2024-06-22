const mongoose = require("mongoose");
const { ForumSchema } = require("../../schemas/socket/forum");

const File = mongoose.model("forum", ForumSchema);
module.exports = File;
