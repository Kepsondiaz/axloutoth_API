const Question = require("../../models/socket/QuestionModel")
const User = require("../../models/auth/User.js")
const {HttpError} =  require("../../utils/exceptions.js")


class QuestionService {

    // Creation d'une question sur un forum
    static async addQuestion(userId, forumId, content) {

      try {

        const user = await User.findById(userId);

        const userRole = user.role

        if (userRole!== 'STUDENT' && userRole!== 'MODERATOR') {
          throw new HttpError(null, 400, 'Seuls les étudiants et les modérateurs peuvent poser des questions');
        }

        const question = new Question({ forumId, userId, content });
        await question.save();

        return {

          success: true,
          message: "La question est ajoutée avec succès",
          data: question

        };
      } catch (err) {
        throw new HttpError(err, 500, `Impossible d'ajouter la question : ${err.message}`);
      }
    }


    // Affichage des questions appartenat a un forum 
    static async getQuestionsByForum(forumId) {

      try {

        const questions = await Question.find({ forumId });

        if (questions.length === 0) {
          return { message: "Aucune question a été posé sur ce forum" };
        }
        return questions;
      } catch (err) {
        throw new HttpError(err, 500, `Impossible de récupérer les questions : ${err.message}`);
      }
    }
    
   
    // Mise à jour d'une question 
    static async updateQuestion(userId, questionId, content) {
      try {

        const user = await User.findById(userId);

        const userRole = user.role

        const question = await Question.findById(questionId);

        if (!question) {
          throw new HttpError(null, 400, 'Question non trouvée');
        }

        if (userRole === 'STUDENT' && question.userId.toString()!== userId) {
          throw new HttpError(null, 400, "Vous n'êtes pas le propriétaire de cette question");
        }
        question.content = content;
        await question.save();

        return {

          success: true,
          message: "Question mise à jour avec succès",
          data: question

        };
      } catch (err) {
        throw new HttpError(err, 500, `Impossible de mettre à jour la question : ${err.message}`);
      }
    }

    // Répondre à une question
    static async respondToQuestion(userId, questionId) {

      try {

          const user = await User.findById(userId);

          const userRole = user.role

        if (userRole!== 'STUDENT' && userRole!== 'MODERATOR') {

          throw new HttpError(null, 400, 'Seuls les étudiants et les modérateurs peuvent répondre à des questions');
        }
        const question = await Question.findById(questionId);

        if (!question) {
          throw new HttpError(null, 400, 'Question non trouvée');
        }

        if (question.isCompleted) {
          throw new HttpError(null, 400, 'Cette question est déjà cloturée');
        }

      
        question.participants.push(userId);
        await question.save();


        return {

          success: true,
          message: "Vous avez répondu à la question avec succès",
          data: question

        };
      } catch (err) {
        throw new HttpError(err, 500, `Impossible de répondre à la question : ${err.message}`);
      }
    }


   // Supprimer une question
    static async deleteQuestion(userId, questionId) {

      try {

        const user = await User.findById(userId);
        const userRole = user.role;

        const question = await Question.findById(questionId);

        if (!question) {
          throw new HttpError(null, 400, 'Question non trouvée');
        }

        if (userRole === 'STUDENT' && question.userId.toString()!== userId) {
          throw new HttpError(null, 400, "Désolé, Vous n'êtes pas le propriétaire de cette question");
        }

        if (userRole === 'MODERATOR') {
          // Le modérateur peut supprimer n'importe quelle question
          await question.remove();
          return {
            success: true,
            message: "La question a été supprimée avec succès"
          };
        } else {
          // Seul le propriétaire de la question peut la supprimer
          if (question.userId.toString()!== userId) {
            throw new HttpError(null, 400, "Désolé, Vous n'êtes pas le propriétaire de cette question");
          }
          await question.remove();
          return {
            success: true,
            message: "La question a été supprimée avec succès"
          };
        }
      } catch (err) {
        throw new HttpError(err, 500, `Impossible de supprimer la question : ${err.message}`);
      }
    }

      // Cloturer une question
    static async closeQuestion(userId, questionId) {

      try {


        const user = await User.findById(userId);
        const userRole = user.role;


        if (userRole!== 'MODERATOR') {
          throw new HttpError(null, 400, 'Seuls les modérateurs peuvent cloturer des questions');
        }

        const question = await Question.findById(questionId);
        if (!question) {
          throw new HttpError(null, 400, 'Question non trouvée');
        }

        question.isCompleted = true;
        await question.save();

        return {
          success: true,
          message: "La question a été cloturée avec succès"
        };
        
      } catch (err) {
        throw new HttpError(err, 500, "Erreur interne au serveur")
      }
    } 


}


module.exports = QuestionService



