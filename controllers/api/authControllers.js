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
            return res.status(400).json({ message: "Veuillez fournir tous les champs requis." });
        }

        const registerUser = await AuthService.registerInitialUser({ phone, password, firstname, lastname, address, sexe });

        return res.status(201).json(registerUser);
    } catch (error) {
        console.error(error);
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
    }
};

/**
 * Complète l'enregistrement de l'utilisateur (Étape 2)
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
const completeRegistration = async (req, res) => {
    try {
        const { email, role } = req.body;
        const { userId } = req.params;

        if (!email || !role || !userId) {
            return res.status(400).json({ message: "Veuillez fournir tous les champs requis." });
        }

        const result = await AuthService.completeRegistration({ email, role }, userId);

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

module.exports = {
    authRegisterUser,
    completeRegistration,
    authLoginUser,
};
