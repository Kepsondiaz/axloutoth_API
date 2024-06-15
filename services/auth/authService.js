const UserService = require("../api/userService.js");
const User = require("../../models/User.js");
const { HttpError } = require("../../utils/exceptions.js");
const { Niveaux, Series } = require('../../schemas/user.js'); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthService {

    static async registerInitialUser(Userdata) {

        
        try {

            // Vérification si le numéro de téléphone existe déjà
            const existingUser = await User.findOne({ phone: Userdata.phone });
            
            if (existingUser) {
                throw new HttpError(null, 400, "Le numéro de téléphone est déjà utilisé.");
            }

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
            } else {
                throw new HttpError(err, 500, "Erreur interne du serveur.");
            }
        }
    }

    static async completeRegistration(userId, userData) {

        try {

            const user = await User.findById(userId);

            if (!user) {
                throw new HttpError(null, 404, "Utilisateur introuvable.");
            }

            if (user.niveau && user.serie && user.etablissement) {

                return {
                    success: false,
                    message: "Vous avez déjà complété votre enregistrement.",
                };
            }

            if (userData.niveau && !Object.values(Niveaux).includes(userData.niveau)) {
                throw new HttpError(null, 400, "Niveau invalide.");
            }

            if (userData.niveau === Niveaux.SECOND) {
                if (!userData.serie || !(Series.SCIENTIFIQUE.includes(userData.serie) || Series.LITTERAIRE.includes(userData.serie))) {
                    throw new HttpError(null, 400, "Série invalide pour le niveau secondaire.");
                }
            } else if (userData.niveau === Niveaux.PREMIERE || userData.niveau === Niveaux.TERMINAL) {
                if (!userData.serie || !Series.SCIENTIFIQUE.includes(userData.serie)) {
                    throw new HttpError(null, 400, "Série invalide pour le niveau première ou terminal.");
                }
            }

            user.niveau = userData.niveau;
            user.serie = userData.serie;
            user.etablissement = userData.etablissement;

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
                throw new HttpError(null, 400, "Téléphone ou mot de passe invalides");
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new HttpError(null, 400, "Téléphone ou mot de passe invalides");
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

            const isComplete = Boolean(user.niveau && user.serie && user.etablissement);

            return {
                userId: user.id,
                token,
                success: true,
                message: "Authentifié",
                isComplete
            };
        } catch (error) {
            if (error instanceof HttpError) throw error;
            throw new HttpError(error, 500, "Erreur du serveur");
        }
    }


    static async changePassword(userId, newPassword) {
        try {
            // Hash du nouveau mot de passe
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Mise à jour du mot de passe dans la base de données
            const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

            if (!user) {
                throw new HttpError(null, 404, "Utilisateur non trouvé.");
            }

            return { 
                success: true,
                message: "Mot de passe modifié avec succès." };

        } catch (error) {
            console.error(error);
            if (error instanceof HttpError) {
                throw error;
            } else {
                throw new HttpError(error, 500, "Erreur interne du serveur.");
            }
        }
    }

    static async resetPassword(userId, newPassword) {
        try {
            // Hash du nouveau mot de passe
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            
            const user = await User.findById(userId);
            if (!user) {
                throw new HttpError(null, 404, "Utilisateur non trouvé.");
            }

            user.password = hashedPassword;

            await user.save();

            return { 
                success: true,
                message: "Mot de passe réinitialisé avec succès." 
            };

        } catch (error) {
            console.error(error);
            if (error instanceof HttpError) {
                throw error;
            } else {
                throw new HttpError(error, 500, "Erreur interne du serveur.");
            }
        }
    }


    static async updateUserInformation (userId, phone, updates) {

        // Vérifier si le téléphone existe
        const existingUser = await User.findOne({ phone });

        if (!existingUser) {
            throw new Error('Numéro de téléphone invalide.');
        }
    
        // Trouver l'utilisateur par ID
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Utilisateur non trouvé.');
        }
    
        // Mise à jour des informations utilisateur
        Object.keys(updates).forEach(key => {

            if (updates[key] !== undefined) {
                user[key] = updates[key];
            }
        });
    
        await user.save();
        return user;
    };
    


    /*
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
    */
}

module.exports = AuthService;
