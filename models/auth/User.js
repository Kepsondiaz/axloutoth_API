const mongoose = require("mongoose");
const { UserSchema } = require("../../schemas/auth/user");

const User = mongoose.model("users", UserSchema);
module.exports = User;
