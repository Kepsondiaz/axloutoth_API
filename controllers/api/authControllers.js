  const AuthService = require("../../services/auth/authService.js");
  const { HttpError } = require("../../utils/exceptions.js");

  /**
   * Enregistre un nouvel utilisateur (Étape 1)
   * @param {import('express').Request} req - Requête Express
   * @param {import('express').Response} res - Réponse Express
   * @returns {Promise<void>} - Promesse indiquant la fin du traitement
   */
  const authRegisterUser = async (req, res) => {

    try {

      const { phone, password, firstname, lastname, address, sexe } = req.body;

      if (!phone || !password || !firstname || !lastname || !address || !sexe) {
        return res
          .status(400)
          .json({ message: "Veuillez fournir tous les champs requis." });
      }

      const registerUser = await AuthService.registerInitialUser({
        phone,
        password,
        firstname,
        lastname,
        address,
        sexe,
      });

      return res.status(201).json(registerUser);
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          message: error.message,
        });
      } else {
        res.status(500).json({ message: "Erreur interne du serveur" });
      }
    }
  };


  const completeRegistration = async (req, res) => {
    try {
      const token = req.params.token;

      // Vérifier si le token est présent
      if (!token) {
        return res.status(400).json({ message: "Le token est requis" });
      }

      const result = await AuthService.completeRegistration(token, req.body);

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Erreur interne du serveur." });
      }
    }
  };


  const sendReferralLink = async (req, res, next) => {

    const { token } = req.params; 
    const { referralLink } = req.body; 

    try {
        
        const result = await AuthService.sendReferralLink(token, referralLink);
        return res.json(result);

    } catch (error) {
       
        if (error instanceof HttpError) {
            return next(error);
        }
        return next(new HttpError(error, 500, "Erreur interne du serveur."));
    }
};


  /**
   * Authentifie un utilisateur
   * @param {import('express').Request} req - Requête Express
   * @param {import('express').Response} res - Réponse Express
   * @returns {Promise<void>} - Promesse indiquant la fin du traitement
   */
  const authLoginUser = async (req, res) => {
    try {
      const loginUser = await AuthService.loginUser(req.body);
      return res.status(200).json(loginUser);
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };



  const changePassword = async (req, res) => {
    
    try {
        const token = req.params.token;

        if (!token) {
            return res.status(400).json({ message: "Le token est requis." });
        }

        // Utiliser le token pour vérifier l'utilisateur et changer le mot de passe
        const result = await AuthService.changePassword(token, req.body.newPassword);

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Erreur interne du serveur." });
        }
    }
  };


  /**
   * Réinitialisation du mot de passe pour un utilisateur spécifié par ID.
   * @param {import('express').Request} req - Requête Express contenant userId dans les paramètres de l'URL et newPassword dans le corps.
   * @param {import('express').Response} res - Réponse Express pour renvoyer le résultat de la réinitialisation du mot de passe.
   * @returns {Promise<void>} - Promesse indiquant la fin du traitement.
   */
  const resetPassword = async (req, res) => {
    try {
        const { phone, newPassword } = req.body;

        // Vérifier si le numéro de téléphone et le nouveau mot de passe sont présents
        if (!phone || !newPassword) {
            return res.status(400).json({ message: "Veuillez fournir le numéro de téléphone et le nouveau mot de passe." });
        }

        const result = await AuthService.resetPassword(phone, newPassword);

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Erreur interne du serveur." });
        }
    }
  };

  const updateUserInfo = async (req, res) => {

    const token = req.params.token;

    try {

        const { phone, firstname, lastname, address } = req.body;

        const updatedUser = await AuthService.updateUserInformation(token, phone, { firstname, lastname, address });
        
        return res.status(200).json({ 

            success: true,
            message: 'Informations utilisateur mises à jour avec succès',
            user: updatedUser
            
        });

    } catch (error) {
        console.error(error);
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erreur interne du serveur.' });
        }
    }
  };



  module.exports = {
    authRegisterUser,
    completeRegistration,
    sendReferralLink,
    authLoginUser,
    changePassword,
    resetPassword,
    updateUserInfo
  };




