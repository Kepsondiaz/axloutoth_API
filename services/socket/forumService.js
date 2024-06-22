const Forum = require("../../models/socket/ForumModel");


class ForumService {

    static async createForum(name, description) {
      try {
        const newForum = new Forum({ name, description });
        await newForum.save();

        /*Émettre un événement 'newForum' vers les clients connectés
        io.emit('newForum', newForum);
        */

        return {

            success: true,
            message: "Forum créé avec succès",
            data: newForum
        };


      } catch (err) {
        console.error(err);
        throw new Error('Échec de la création du forum');
      }
    }
  
    static async getAllForums() {
      try {
        return await Forum.find();
      } catch (err) {
        console.error(err);
        throw new Error('Échec de la récupération des forums');
      }
    }
  
    static async getForumById(forumId) {
      try {
        return await Forum.findById(forumId);
      } catch (err) {
        console.error(err);
        throw new Error(`Échec de la récupération du forum avec l'ID ${forumId}`);
      }
    }
  
    static async updateForum(forumId, name, description) {

      try {

        const result =  await Forum.findByIdAndUpdate(
            forumId, 
            { name, description }, 
            { new: true });

        /*Émettre un événement 'updatedForum' vers les clients connectés
        io.emit('updatedForum', result);
        */

        return {

            success: true,
            message: "Forum mis à jour avec succès",
            data: result
        }

      } catch (err) {
        console.error(err);
        throw new Error(`Échec de la mise à jour du forum avec l'ID ${forumId}`);
      }
    }
  
    /*
    static async deleteForum(forumId) {
      try {
        await Forum.findByIdAndDelete(forumId);
      } catch (err) {
        console.error(err);
        throw new Error(`Échec de la suppression du forum avec l'ID ${forumId}`);
      }
    }
    */
  }

module.exports = ForumService




