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

const Niveaux = Object.freeze({
    SECOND: "Seconde",
    PREMIERE: "Première",
    TERMINAL: "Terminale",
});

const Series = Object.freeze({
    SCIENTIFIQUE: ["S1", "S2", "S3"],
    LITTERAIRE: ["L1", "L2", "L1'"],
});

const UserSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: [true, "Please provide the firstname"],
    },

    lastname: {
        type: String,
        required: [true, "Please provide the lastname"],
    },

    address: {
        type: String,
        required: [true, "Please provide the address"],
    },

    sexe: {
        type: String,
        required: [true, "Please provide the sexe"],
        enum: Object.values(Sexes),
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

    niveau: {
        type: String,
        enum: Object.values(Niveaux),
    },

    serie: {
        type: String,
    },

    etablissement: {
        type: String,
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },

    referralCode: { 
        type: String,
         unique: true 
    },

    referralLink: { 
        type: String 
    },

    points: {
         type: Number,
         default: 0 
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
    Niveaux,
    Series,
};
