const mongoose = require("mongoose");
const { UserSchema } = require("../schemas/user");

const User = mongoose.model("users", UserSchema);
module.exports = User;
