const User = require("../models/userModel"); // Importez User une seule fois
const { HttpError } = require("../utils/exceptions");

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

class UserService {
  static async createUser(userData) {
    try {
      const salt = await bcrypt.genSalt(10);
      const cryptPassword = await bcrypt.hash(userData.password, salt);
      userData.password = cryptPassword;
      const user = await User.create(userData);

      return user;
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError) {
        throw error;
      } else if (error.name === "ValidationError") {
        throw new HttpError(error, 400, error.message);
      } else if (error.name === "MongoServerError" && error.code === 11000) {
        throw new HttpError(error, 400, "L'email existe déjà.");
      } else if (error.name === "CastError") {
        throw new HttpError(error, 400, "ID invalide.");
      } else {
        throw new HttpError(error, 500, "Erreur interne du serveur.");
      }
    }
  }

  /**
   * Récupère un utilisateur existant par ID.
   * @param {string} userId - ID de l'utilisateur à récupérer.
   * @returns {Promise<Object>} - Promesse résolue avec l'utilisateur récupéré.
   * @throws {HttpError} - Lance une erreur HTTP personnalisée si la récupération de l'utilisateur échoue.
   */
  static async getUserById(userId) {}

  static async getUserByEmail(userEmail) {}

  static async getUserByPhone(userPhone) {}
  static async getAllUsers() {}
  /**
   * Met à jour un utilisateur existant par ID.
   * @param {string} userId - ID de l'utilisateur à mettre à jour.
   * @param {Object} updatedUserData - Données mises à jour pour l'utilisateur.
   * @returns {Promise<Object>} - Promesse résolue avec l'utilisateur mis à jour.
   * @throws {HttpError} - Lance une erreur HTTP personnalisée si la mise à jour de l'utilisateur échoue.
   */
  static async updateUserById(userId, updatedUserData) {}

  static async updateUserByEmail(userEmail, updatedUserData) {}

  static async updateUserConfirmationStatus(identifiant) {}
  /**
   * Supprime un utilisateur existant par ID.
   * @param {string} userId - ID de l'utilisateur à supprimer.
   * @returns {Promise<Object>} - Promesse résolue avec l'utilisateur supprimé.
   * @throws {HttpError} - Lance une erreur HTTP personnalisée si la suppression de l'utilisateur échoue.
   */
  static async deleteUser(userId) {}
}
module.exports = UserService;
