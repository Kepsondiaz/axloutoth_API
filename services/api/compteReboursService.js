const CompteARebours = require('../../models/api/CompteRebours');
const {HttpError} = require("../../utils/exceptions")

class CompteAReboursService {

  static async addBacDate(dateExamen) {
    try {

      const compteARebours = new CompteARebours({ dateExamen });
      await compteARebours.save();

      return {

        success: true,
        message: "La date de l'examen a été ajoutée avec succès",
        data: compteARebours,

      };
    } catch (err) {
      throw new HttpError(null, 400, `Impossible d'ajouter la date de l'examen : ${err.message}`);
    }
  }

  static async getTimeUntilExam (){

    try{

      const exam = await CompteARebours.findOne();
      if (!exam) {
        throw new Error('Date de l\'examen non trouvée');
      }
    
      const currentDate = new Date();
      const examDate = new Date(exam.examDate);
      let timeDifference = examDate - currentDate;
    
      if (timeDifference <= 0) {
        return 'La date de l\'examen est passée';
      }
    
      const millisecondsInSecond = 1000;
      const millisecondsInMinute = millisecondsInSecond * 60;
      const millisecondsInHour = millisecondsInMinute * 60;
      const millisecondsInDay = millisecondsInHour * 24;
    
      const days = Math.floor(timeDifference / millisecondsInDay);
      timeDifference -= days * millisecondsInDay;
    
      const hours = Math.floor(timeDifference / millisecondsInHour);
      timeDifference -= hours * millisecondsInHour;
    
      const minutes = Math.floor(timeDifference / millisecondsInMinute);
      timeDifference -= minutes * millisecondsInMinute;
    
      const seconds = Math.floor(timeDifference / millisecondsInSecond);
    
      let countdown = '';
      if (days > 0) {
        countdown += `${days}j `;
      }
      if (hours > 0 || days > 0) {
        countdown += `${hours}h `;
      }
      if (minutes > 0 || hours > 0 || days > 0) {
        countdown += `${minutes}m `;
      }
      countdown += `${seconds}s`;
    
      return countdown.trim();

    } catch (err) {
        throw new HttpError(null, 400, `Impossible d'afficher le compte à rebours : ${err.message}`);
      }
  
  
  };
}
  

module.exports = CompteAReboursService;