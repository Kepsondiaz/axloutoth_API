const ForumService = require("../../services/socket/forumService")



const createForum = async (req, res) => {

    const { name, description } = req.body;
    try {
      const forum = await ForumService.createForum(name, description);
      res.status(201).json(forum);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}


const getAllForums = async (req,res) => {

    try {
        const forums = await ForumService.getAllForums();
        res.status(200).json(forums);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}


const getForumById = async (req,res) => {

    const { forumId } = req.params;

    try {
      const forum = await ForumService.getForumById(forumId);

      if (!forum) {
        return res.status(404).json({ error: "Forum invalide" });
      }
      res.status(200).json(forum);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

}


const updateForum = async (req,res) => {

    const { forumId } = req.params;
    const { name, description } = req.body;
    try {
      const updatedForum = await ForumService.updateForum(forumId, name, description);
      if (!updatedForum) {
        return res.status(404).json({ error: "Forum invalide"});
      }
      res.status(200).json(updatedForum);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

}



/*
const deleteForum = async (req,res) => {

    const { forumId } = req.params;
    try {
      const deletedForum = await ForumService.deleteForum(forumId);
      if (!deletedForum) {
        return res.status(404).json({ error: "Forum invalide"});
      }

      res.status(200).json({ 
        success: true,
        message: "Forum supprimé avec succès" 
    
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}
*/

module.exports = {
    createForum,
    getAllForums,
    getForumById,
    updateForum,
    
}



