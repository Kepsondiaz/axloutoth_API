const Question = require("../../models/socket/QuestionModel")


class QuestionService {

    // Creation d'une question sur un forum
    static async addQuestion(forumId, content) {

        try {
          const question = new Question({ forumId, content });
          await question.save();
          return {
            
            success: true,
            message: "La question est ajoutée avec succès", 
            data: question

          };
          
        } catch (err) {
          throw new Error(`Impossible d'ajouter la question : ${err.message}`);
        }
    }
    
    // Affichage des questions appartenant a un forum 

    static async getQuestionsByForum(forumId) {
      try {
        const questions = await Question.find({ forumId });
        
        if (questions.length === 0) {
          return { message: "Aucune question sur ce forum" };
        }
        return questions;
      } catch (err) {
        throw new Error(`Impossible de récupérer les questions : ${err.message}`);
      }
    }

    static async updateQuestion(questionId, content) {

        try {
            
          const question = await Question.findById(questionId);
          if (!question) {
            throw new Error('Question non trouvée');
          }
          question.content = content;
          await question.save();

          return {

            success: true,
            message: "Question mise à jour avec suucès",
            data: question

          }
          
          
        } catch (err) {
          throw new Error(`Impossible de mettre à jour la question : ${err.message}`);
        }
    }
    
    
    static  async markQuestionAsCompleted(questionId) {
        try {
          const question = await Question.findById(questionId);
          if (!question) {
            throw new Error('Question non trouvée');
          }
          question.isCompleted = true;
          await question.save();
    
          const isCompleted = question.isCompleted; 
    
          return { 

            success:true,
            message: `Question marquée comme ${isCompleted ? 'complétée' : 'non complétée'}`,
            data: question

          };
        } catch (err) {
          throw new Error(`Impossible de marquer la question comme terminée : ${err.message}`);
        }
      }
}


module.exports = QuestionService



