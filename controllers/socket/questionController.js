const QuestionService = require("../../services/socket/questionService");
const { HttpError } = require("../../utils/exceptions");

/**
 * Ajoute une question dans un forum
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */

const addQuestion = async (req, res) => {
  try {
    const { userId, forumId } = req.params;
    const { title, contenu } = req.body;

    if (!userId || !forumId || !contenu) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const result = await QuestionService.addQuestion(userId, forumId, title, contenu);
    return res.status(201).json(result);
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
 * Récupère les questions d'un forum
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
const getQuestionsByForum = async (req, res) => {
  try {
    const { forumId } = req.params;

    if (!forumId) {
      return res.status(400).json({ message: "Forum ID requis." });
    }

    const questions = await QuestionService.getQuestionsByForum(forumId);
    return res.status(200).json(questions);
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
 * Met à jour une question
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
const updateQuestion = async (req, res) => {
  try {
    const { userId, questionId } = req.params;
    const { content } = req.body;

    if (!userId || !questionId || !content) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const result = await QuestionService.updateQuestion(userId, questionId, content);
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
 * Répond à une question
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
const respondToQuestion = async (req, res) => {
  try {
    const { userId, questionId } = req.params;
    const { responseContent } = req.body;

    if (!userId || !questionId || !responseContent) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const result = await QuestionService.respondToQuestion(userId, questionId, responseContent);
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
 * Supprime une question
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
const deleteQuestion = async (req, res) => {
  try {
    const { userId, questionId } = req.params;

    if (!userId || !questionId) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const result = await QuestionService.deleteQuestion(userId, questionId);
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
 * Clôture une question
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
const closeQuestion = async (req, res) => {
  try {
    const { userId, questionId } = req.params;

    if (!userId || !questionId) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const result = await QuestionService.closeQuestion(userId, questionId);
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
 * Contrôleur pour liker une question
 * @param {import('express').Request} req - Requête Express contenant userId dans les paramètres et questionId dans les paramètres de l'URL.
 * @param {import('express').Response} res - Réponse Express pour renvoyer le résultat de l'opération de like.
 * @param {import('express').NextFunction} next - Fonction pour passer à l'erreur suivante.
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement.
 */

const likeQuestion = async (req, res, next) => {
  try {
    const { userId, questionId } = req.params;

    const result = await QuestionService.likeQuestion(userId, questionId);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Erreur interne du serveur." });
    }
  }
}
module.exports = {
  addQuestion,
  getQuestionsByForum,
  updateQuestion,
  respondToQuestion,
  deleteQuestion,
  closeQuestion,
  likeQuestion
};
