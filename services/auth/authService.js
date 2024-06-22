const UserService = require("../api/userService.js");
const User = require("../../models/auth/User.js");
const { HttpError } = require("../../utils/exceptions.js");
const { Niveaux, Series } = require('../../schemas/auth/user.js'); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



class AuthService {


    static registrationToken = null;
    static referralLinkRegistrationToken = null;
    static referralLinkLoginToken = null;
    static loginToken = null;

    static generateReferralCode() {
        // Génération du code de parrainage - à adapter selon vos besoins
        return Math.random().toString(36).substr(2, 8).toUpperCase();
    }


    static generateReferralLink(referralCode) {
        // Génération du lien de parrainage avec le format spécifié
        return `https://axlouToth.onlink.me/${referralCode}`;
    }
    
    static async registerInitialUser(Userdata) {
        try {
            const existingUser = await User.findOne({ phone: Userdata.phone });
            if (existingUser) {
                throw new HttpError(null, 400, "Le numéro de téléphone est déjà utilisé.");
            }

            const hashedPassword = await bcrypt.hash(Userdata.password, 10);

            const referralCode = AuthService.generateReferralCode(); 
            const referralLink = AuthService.generateReferralLink(referralCode); 

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

                registrationToken: true,
                referralLinkRegistrationToken:true
                
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

            AuthService.registrationToken = token;
            AuthService.referralLinkRegistrationToken = token;
            
            return {
               
                success: true,
                message: "Utilisateur enregistré avec succès. Complétez l'enregistrement",
                token: AuthService.registrationToken,

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

    static async completeRegistration(token, userData) {
        try {

    
            if (token !== AuthService.registrationToken) {
               throw new HttpError(null, 400, "Token invalide.");
            }

           // Vérifier si le token est valide
           const payload = jwt.verify(token, process.env.JWT_SECRET);
           const userId = payload.user.id;
      
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

           // Génération du code et du lien de parrainage
           const userReferralCode = AuthService.generateReferralCode();
           const userReferralLink = AuthService.generateReferralLink(userReferralCode);

           // Mise à jour des informations de parrainage de l'utilisateur
           user.referralCode = userReferralCode;
           user.referralLink = userReferralLink;

           // Vérification si un code de parrainage est présent dans userData
           if (userData.referralCode) {
               const referringUser = await User.findOne({ referralCode: userData.referralCode });
               if (referringUser) {
                   referringUser.points += 10; 
                   await referringUser.save();
               }
           }

          
           if (userData.niveau && !Object.values(Niveaux).includes(userData.niveau)) {
              throw new HttpError(null, 400, "Niveau invalide.");
           }
        
            if (userData.niveau === Niveaux.SECOND) {
            // Pour le niveau SECOND, la série peut être soit scientifique soit littéraire
              if (!userData.serie || !(Series.SCIENTIFIQUE.includes(userData.serie) || Series.LITTERAIRE.includes(userData.serie))) {
                 throw new HttpError(null, 400, "Série invalide pour le niveau secondaire.");
            }
            } else if (userData.niveau === Niveaux.PREMIERE) {
            // Pour le niveau PREMIERE, la série doit être scientifique
               if (!userData.serie || !Series.SCIENTIFIQUE.includes(userData.serie)) {
                 throw new HttpError(null, 400, `Série invalide pour le niveau ${userData.niveau}.`);
            }
            } else if (userData.niveau === Niveaux.TERMINAL) {
            // Pour le niveau TERMINAL, la série peut être scientifique ou littéraire
            if (!userData.serie || !(Series.SCIENTIFIQUE.includes(userData.serie) || Series.LITTERAIRE.includes(userData.serie))) {
                throw new HttpError(null, 400, `Série invalide pour le niveau ${userData.niveau}.`);
            }
           }
      
          // Mettre à jour les informations utilisateur
          user.niveau = userData.niveau;
          user.serie = userData.serie;
          user.etablissement = userData.etablissement;
      
          await user.save();
      
          return {
            
            success: true,
            message: "Enregistrement complété avec succès.",
            referralCode: userReferralCode,
            referralLink: userReferralLink,

          };
        } catch (err) {
          if (err instanceof HttpError) {
            throw err;
          } else if (err.name === "ValidationError") {
            throw new HttpError(err, 400, err.message);
          } else {
            throw new HttpError(err, 500, "Erreur interne du serveur.");
          }
        }
      }


      static async sendReferralLink(token, referralLink) {

        try {

            if (token !== AuthService.referralLinkRegistrationToken && token !== AuthService.referralLinkLoginToken) {

                throw new HttpError(null, 400, "Token invalide.");
            }
 
            // Vérifier si le token est valide
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const userId = payload.user.id;
       
            const user = await User.findById(userId);
       
            if (!user) {
              throw new HttpError(null, 404, "Utilisateur introuvable.");
            }
       
            if (!(user.niveau && user.serie && user.etablissement)) {
              return {
                success: false,
                message: "Vous devez compléter votre enregistrement avant d'envoyer des codes de parrainage.",
             };
           }

            // Vérifier si le lien de parrainage est valide
            const referredUser = await User.findOne({ referralLink });
            if (!referredUser) {
                throw new HttpError(null, 404, "Lien de parrainage invalide.");
            }

            // Ajouter des points à l'utilisateur référant
            user.points += 10;
            await user.save();

            return {

                success: true,
                message: "Code de parrainage envoyé avec succès",
                points: user.points,
                data: referredUser,
                
            };

        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            } else if (error instanceof TokenExpiredError) {
                throw new HttpError(null, 401, "Token expiré.");
            } else {
                throw new HttpError(error, 500, "Erreur interne du serveur.");
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
                loginToken: true,
                referralLinkLoginToken:true,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });

            AuthService.loginToken = token; // Stocker le token dans la classe
            AuthService.referralLinkLoginToken = token;

            const isComplete = Boolean(user.niveau && user.serie && user.etablissement);

            return {

                success: true,
                message: "Utilisateur authentifié avec succès",
                points: user.points, 
                referralLink: user.referralLink,
                isComplete,
                token: AuthService.loginToken, 
                
            };
        } catch (error) {
            if (error instanceof HttpError) throw error;
            throw new HttpError(error, 500, "Erreur du serveur");
        }
    }

    static async changePassword(token, newPassword) {
        try {
            if (token !== AuthService.loginToken) {
                
                throw new HttpError(null, 400, "Token invalide.");
            }

            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const userId = payload.user.id;

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

            if (!user) {
                throw new HttpError(null, 404, "Utilisateur non trouvé.");
            }

            return {
                success: true,
                message: "Mot de passe modifié avec succès."
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


    static async resetPassword(phone, newPassword) {
        try {
            // Hash du nouveau mot de passe
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Trouver l'utilisateur par téléphone
            const user = await User.findOne({ phone });
            if (!user) {
                throw new HttpError(null, 404, "Utilisateur non trouvé.");
            }

            user.password = hashedPassword;
            await user.save();

            return { 

                success: true,
                message: "Mot de passe réinitialisé avec succès"

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


    static async updateUserInformation(token, phone, updates) {
        
        if (token !== AuthService.loginToken) {
            throw new HttpError(null, 400, "Token invalide.");
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userId = payload.user.id;

        const existingUser = await User.findOne({ phone });
        if (!existingUser) {
            throw new Error('Numéro de téléphone invalide.');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Utilisateur non trouvé.');
        }

        Object.keys(updates).forEach(key => {
            if (updates[key] !== undefined) {
                user[key] = updates[key];
            }
        });

        await user.save();
        return user;
    }


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
