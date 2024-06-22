const mongoose = require("mongoose");
const { QuestionSchema } = require("../../schemas/socket/question");

const User = mongoose.model("question", QuestionSchema);
module.exports = User;
