const ForumService = require("../../services/socket/forumService");
const Matiere = require("../../models/api/MatiereModel.js")

const createForum = async (req, res) => {
  const { userId, matiereId } = req.params;
  const { description, regle } = req.body;
  try {

    const matiere = await Matiere.findById(matiereId);
    if (!matiere) {
      throw new Error("La matière n'existe pas");
    }
    const name = matiere.intitule; 
    
    const forum = await ForumService.createForum(userId, name, description, regle, matiereId);
    res.status(201).json(forum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllForums = async (req, res) => {
  try {
    const forums = await ForumService.getAllForums();
    res.status(200).json(forums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getForumById = async (req, res) => {
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
};

const updateForum = async (req, res) => {
  const { userId, matiereId, forumId } = req.params;
  const { name, description, regle } = req.body;
  try {
    const updatedForum = await ForumService.updateForum(forumId, userId, name, description, regle, matiereId);
    if (!updatedForum) {
      return res.status(404).json({ error: "Forum invalide" });
    }
    res.status(200).json(updatedForum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteForum = async (req, res) => {
  const { userId, forumId } = req.params;
  try {
    const deletedForum = await ForumService.deleteForum(userId, forumId);
    if (!deletedForum) {
      return res.status(404).json({ error: "Forum invalide" });
    }
    res.status(200).json({ success: true, message: "Forum supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createForum,
  getAllForums,
  getForumById,
  updateForum,
  deleteForum,
};