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
      const userId = req.params.userId;
      const result = await AuthService.completeRegistration(userId, req.body);

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
      const { newPassword } = req.body;
      const userId = req.params.userId; 

      const result = await AuthService.changePassword(userId, newPassword);

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
      const { newPassword } = req.body;
      const { userId } = req.params;

      if (!newPassword || !userId) {

          return res.status(400).json({ message: "Veuillez fournir un nouveau mot de passe et un ID d'utilisateur valide." });
      }

      const result = await AuthService.resetPassword(userId, newPassword);

      return res.status(200).json(result);
  } catch (error) {
      console.error(error);
      if (error instanceof HttpError) {
          res.status(error.statusCode).json({ message: error.message });
      } else {
          res.status(500).json({ message: "Erreur interne du serveur" });
      }
  }
};


const updateUserInfo = async (req, res) => {

  const userId = req.params.userId;
  const { phone, firstname, lastname, address } = req.body;

  try {
      // Appel du service pour mettre à jour les informations utilisateur
      const updatedUser = await AuthService.updateUserInformation(userId, phone, { firstname, lastname, address });
      return res.status(200).json({ 

        success: true,
        message: 'Informations utilisateur mises à jour avec succès', 
        user: updatedUser });
        
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};




module.exports = {
  authRegisterUser,
  completeRegistration,
  authLoginUser,
  changePassword,
  resetPassword,
  updateUserInfo
};




