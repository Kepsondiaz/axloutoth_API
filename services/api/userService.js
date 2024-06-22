const User = require("../../models/auth/User.js");
const { HttpError } = require("../../utils/exceptions.js");
const integretyTester = require("../../utils/integrity.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

class UserService {
    
    static async validateUserData(userData) {
        const errors = validationResult(userData);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "tester" });
        }

        const {
            firstname,
            lastname,
            address,
            sexe,
            email,
            password,
            role,
            phone,
            isDeleted = false,
            ...rest
        } = userData;

        const validatedUserData = {};

        if (!firstname || typeof firstname !== "string") {
            throw new HttpError(
                null,
                400,
                "Le prénom est requis et doit être une chaîne de caractères."
            );
        }
        validatedUserData.firstname = firstname;

        if (!lastname || typeof lastname !== "string") {
            throw new HttpError(
                null,
                400,
                "Le nom de famille est requis et doit être une chaîne de caractères."
            );
        }
        validatedUserData.lastname = lastname;

        if (!address || typeof address !== "string") {
            throw new HttpError(
                null,
                400,
                "L'adresse est requise et doit être une chaîne de caractères."
            );
        }
        validatedUserData.address = address;

        if (!sexe || !["M", "F"].includes(sexe)) {
            throw new HttpError(
                null,
                400,
                "Le sexe doit être 'M' (Masculin) ou 'F' (Féminin)."
            );
        }
        validatedUserData.sexe = sexe;

        if (!integretyTester.isEmail(email)) {
            throw new HttpError(null, 400, "Format d'email invalide.");
        }
        validatedUserData.email = email;

        if (!password || typeof password !== "string" || password.length < 6) {
            throw new HttpError(
                null,
                400,
                "Le mot de passe est requis et doit comporter au moins 6 caractères."
            );
        } else {
            const salt = await bcrypt.genSalt(10);
            const cryptPassword = await bcrypt.hash(password, salt);
            validatedUserData.password = cryptPassword;
        }

        if (role && !["STUDENT", "ADMIN", "MODERATOR"].includes(role.toUpperCase())) {
            throw new HttpError(null, 400, "Rôle utilisateur invalide.");
        }

        validatedUserData.role = role;

        if (!phone || typeof phone !== "string") {
            throw new HttpError(
                null,
                400,
                "Le numéro de téléphone est requis et doit être un nombre."
            );
        }
        validatedUserData.phone = phone;

        if (Object.keys(rest).length > 0) {
            throw new HttpError(null, 400, "Champs supplémentaires invalides.");
        }

        return validatedUserData;
    }

    static async createUser(userData) {
        try {
            const validatedUserData = await UserService.validateUserData(userData);

            // Vérifier si le numéro de téléphone existe déjà
            const existingUser = await User.findOne({ phone: validatedUserData.phone });
            if (existingUser) {
                throw new HttpError(null, 400, "Le numéro de téléphone existe déjà.");
            }

            // Créer un nouvel utilisateur
            const user = await User.create(validatedUserData);
            return user;
        } catch (error) {
            console.error(error);
            if (error instanceof HttpError) {
                throw error;
            } else if (error.name === "ValidationError") {
                throw new HttpError(error, 400, error.message);
            } else if (error.name === "MongoServerError" && error.code === 11000) {
                throw new HttpError(error, 400, "Le numéro de téléphone existe déjà.");
            } else if (error.name === "CastError") {
                throw new HttpError(error, 400, "ID invalide.");
            } else {
                throw new HttpError(error, 500, "Erreur interne du serveur.");
            }
        }
    }


    static async updateUser(userId, updatedUserData) {
        try {
            const validatedUserData = UserService.validateUserData(updatedUserData);
            const user = await User.findByIdAndUpdate(userId, validatedUserData, {
                new: true,
            });

            if (!user) {
                throw new HttpError(null, 404, "Utilisateur introuvable.");
            }

            return user;
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            } else {
                throw new HttpError(error, 500, "Erreur interne du serveur.");
            }
        }
    }

    static async deleteUser(userId) {
        try {
            const user = await User.findByIdAndUpdate(userId, { isDeleted: true });

            if (!user) {
                throw new HttpError(null, 404, "Utilisateur introuvable.");
            }

            return user;
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            } else {
                throw new HttpError(error, 500, "Erreur interne du serveur.");
            }
        }
    }

    static async getUserById(userId) {
        try {
            const user = await User.findById(userId);

            if (!user) {
                throw new HttpError(error, 404, "Utilisateur introuvable.");
            }

            return user;
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            } else {
                throw new HttpError(error, 500, "Erreur interne du serveur.");
            }
        }
    }

    static async getAllUsers() {
        try {
            const users = await User.find();

            if (users.length === 0) {
                throw new HttpError(error, 404, "Aucun utilisateur trouvé.");
            }

            return users;
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            } else {
                throw new HttpError(error, 500, "Erreur interne du serveur.");
            }
        }
    }
}

module.exports = UserService;
