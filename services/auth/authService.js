const UserService = require("../api/userService.js");
const User = require("../../models/User.js");
const { HttpError } = require("../../utils/exceptions.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthService {

    static async registerInitialUser(Userdata) {
        try {
            const hashedPassword = await bcrypt.hash(Userdata.password, 10);
            const user = new User({
                phone: Userdata.phone,
                password: hashedPassword,
                firstname: Userdata.firstname,
                lastname: Userdata.lastname,
                address: Userdata.address,
                sexe: Userdata.sexe,
            });

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                },
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

            return {
                token,
                success: true,
                message: "Utilisateur enregistré avec succès. Complétez l'enregistrement.",
            };
        } catch (err) {
            if (err instanceof HttpError) throw err;
            if (err.name === "ValidationError") {
                throw new HttpError(err, 400, err.message);
            } else if (err.code === 11000) {
                throw new HttpError(err, 400, "Le téléphone est déjà utilisé.");
            } else {
                throw new HttpError(err, 500, "Erreur interne du serveur.");
            }
        }
    }

    static async completeRegistration(Userdata, userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new HttpError(null, 404, "Utilisateur introuvable.");
            }

            // Vérifiez si les champs email et role sont déjà remplis
            if (user.email && user.role) {
                return {
                    success: false,
                    message: "Vous avez déjà complété votre enregistrement.",
                };
            }

            user.email = Userdata.email;
            user.role = Userdata.role;

            await user.save();

            return {
                success: true,
                message: "Enregistrement complété avec succès.",
            };
        } catch (err) {
            if (err instanceof HttpError) throw err;
            if (err.name === "ValidationError") {
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

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });

            return {
                userId: user.id,
                token,
                success: true,
                message: "Authentifié",
            };
        } catch (error) {
            if (error instanceof HttpError) throw error;
            throw new HttpError(error, 500, "Erreur du serveur");
        }
    }


    static async getCurrentUser(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.user.id);

            if (!user) {
                throw new HttpError(null, 404, "Utilisateur introuvable.");
            }

            return user;
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new HttpError(error, 401, "Token invalide");
            }
            throw new HttpError(error, 500, "Erreur du serveur");
        }
    }

}

module.exports = AuthService;
