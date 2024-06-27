const Forum = require("../../models/socket/ForumModel");
const User = require("../../models/auth/User.js");
const Matiere = require("../../models/api/MatiereModel.js")
const {HttpError} =  require("../../utils/exceptions.js")

class ForumService {


  static async createForum(userId, name, description, regle, matiereId) {

    try {

      const user = await User.findById(userId);

      if (user.role!== "ADMIN") {
        throw new HttpError(null, 400, "Seul l'administrateur peut créer un forum");
      }

      const matiere = await Matiere.findById(matiereId);
      if (!matiere) {
        throw new Error("La matière n'existe pas");
      }

      name = matiere.intitule


      const newForum = new Forum({ name, description, regle, userId, matiereId});
      await newForum.save();
      

      return {

        success: true,
        message: "Forum créé avec succès",
        data: newForum

      };

    } catch (err) {
      console.error(err);
      throw new HttpError(err, 500, "Échec de la création du forum");
    }
  }


  static async getAllForums() {
      try {
        return await Forum.find();
      } catch (err) {
        console.error(err);
        throw new HttpError(err, 500, "Échec de la récupération des forums");
      }
    }
  
    static async getForumById(forumId) {
      try {
        return await Forum.findById(forumId);
      } catch (err) {
        console.error(err);
        throw new HttpError(err, 500,`Échec de la récupération du forum avec l'ID ${forumId}`);
      }
    }

  
    static async updateForum(forumId, userId, name, description, regle, matiereId) {

      try {

        const user = await User.findById(userId);

        if (user.role!== "ADMIN") {
          throw new HttpError( null, 400, "Seul l'administrateur peut mettre à jour un forum");
        }
    
        const forum = await Forum.findById(forumId);
        if (!forum) {
          throw new HttpError(null, 400, "Le forum n'existe pas");
        }
    
        const matiere = await Matiere.findById(matiereId);
        if (!matiere) {
          throw new HttpError(null, 400, "La matière n'existe pas");
        }
    
        forum.name = name;
        forum.description = description;
        forum.regle = regle;
        forum.matiereId = matiereId;
    
        await forum.save();
    
        return {

          success: true,
          message: "Forum mis à jour avec succès",
          data: forum

        };
    
      } catch (err) {
        console.error(err);
        throw new HttpError(err, 500, 'Échec de la mise à jour du forum');
      }
    }
  
    static async deleteForum(userId, forumId) {

    try {
      const user = await User.findById(userId);
      if (user.role!== "ADMIN") {
        throw new HttpError(null, 400, "Seul l'administrateur peut supprimer un forum");
      }
      await Forum.findByIdAndDelete(forumId);
      return {
        success: true,
        message: "Forum supprimé avec succès"
      };
    } catch (err) {
      console.error(err);
      throw new HttpError(err, 500, `Échec de la suppression du forum avec l'ID ${forumId}`);
    }
  }

}

module.exports = ForumService




