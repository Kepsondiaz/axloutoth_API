const mongoose = require("mongoose");
const { UserSchema } = require("../../schemas/auth/user");

const User = mongoose.model("user", UserSchema);
module.exports = User;
