const UserService = require("../services/userService");
const HttpError = require("../utils/exceptions");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Assurez-vous d'importer jwt

/**
 * Enregistre un nouvel utilisateur
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
async function hashSecret(secret) {
  return bcrypt.hash(secret, 10);
}
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
const userRegisterUser = async (req, res) => {
  try {
    const registerUser = await UserService.createUser(req.body);
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

module.exports = {
  userRegisterUser,
};
