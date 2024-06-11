const AuthService = require("../../services/auth/authService.js");
const { HttpError } = require("../../utils/exceptions.js");

/**
 * Enregistre un nouvel utilisateur
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */

const authRegisterUser = async (req, res) => {
    try {
        const registerUser = await AuthService.registerUser(req.body);

        return res.status(201).json(registerUser);
    } catch (error) {
        console.error(error);
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
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
    authLoginUser,
};
