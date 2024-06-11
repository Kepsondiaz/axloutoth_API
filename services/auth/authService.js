const UserService = require("../api/userService.js");
const User = require("../../models/User.js");
const { HttpError } = require("../../utils/exceptions.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthService {
    static async registerUser(Userdata) {
        try {
            const user = await UserService.createUser(Userdata);
            if (!user) {
                throw new HttpError(null, 404, "Utilisateur introuvable.");
            }

            const payload = {
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    role: user.role,
                },
            };

            let token;
            try {
                token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });
            } catch (error) {
                throw new HttpError(error, 500, "Échec de la génération du token.");
            }

            return {
                token,
                success: true,
                message: "Utilisateur enregistré et token généré avec succès.",
            };
        } catch (err) {
            if (err instanceof HttpError) throw err;
            if (err.name === "ValidationError") {
                throw new HttpError(err, 400, err.message);
            } else if (err.code === 11000) {
                throw new HttpError(err, 400, err.message);
            } else {
                throw new HttpError(err, 500, "Erreur interne du serveur.");
            }
        }
    }

    static async loginUser(Userdata) {
        try {
            const { phone, password } = Userdata;

            let user = await User.findOne({ phone });
            if (!user) {
                throw new HttpError(null, 400, "Identifiants invalides");
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new HttpError(null, 400, "Identifiants invalides");
            }

            const payload = {
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                },
            };

            let token;
            try {
                token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });
            } catch (error) {
                throw new HttpError(error, 500, "Échec de la génération du token.");
            }

            return {
                token,
                success: true,
                message: "Authentifié",
            };
        } catch (error) {
            if (error instanceof HttpError) throw error;
            throw new HttpError(error, 500, "Erreur du serveur");
        }
    }
}

module.exports = AuthService;
