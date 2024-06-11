const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please give the firstname"],
    },
    lastname: {
        type: String,
        required: [true, "Please give the lastname"],
    },

    address: {
        type: String,
        required: [true, "Please give the address"],
    },

    sexe: {
        type: String,
        required: [true, "Please give the sexe"],
        enum: ["M", "F"],
    },

    email: {
        type: String,
        required: [true, "Please give the email"],
        trim: true,
    },

    role: {
        type: String,
        enum: ["STUDENT", "ADMIN", "MODERATOR"],
        default: "STUDENT",
    },

    phone: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
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

const skipDeleted = function () {
    this.where({ isDeleted: false });
};

UserSchema.pre("find", skipDeleted);
UserSchema.pre("findOne", skipDeleted);
UserSchema.pre("findById", skipDeleted);
UserSchema.pre("updateOne", skipDeleted);
UserSchema.pre("updateMany", skipDeleted);
UserSchema.pre("findOneAndUpdate", skipDeleted);
UserSchema.pre("deleteOne", skipDeleted);
UserSchema.pre("deleteMany", skipDeleted);

const User = mongoose.model("user", UserSchema);
module.exports = User;
