const mongoose = require("mongoose");

const Roles = Object.freeze({
    STUDENT: "STUDENT",
    ADMIN: "ADMIN",
    MODERATOR: "MODERATOR",
});

const Sexes = Object.freeze({
    MALE: "M",
    FEMALE: "F",
});

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
        enum: Object.values(Sexes),
    },
    email: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: Object.values(Roles),
        default: Roles.STUDENT,
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

module.exports = {
    UserSchema,
    Roles,
    Sexes,
};
