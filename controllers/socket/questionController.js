const QuestionService = require("../../services/socket/questionService")


const addQuestion = async (req, res) => {

    try {

      const {forumId} = req.params;
      const { content } = req.body;
      const result = await QuestionService.addQuestion(forumId, content);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


const getQuestionsByForum = async (req, res) => {
    try {
      const { forumId } = req.params;
      const result = await QuestionService.getQuestionsByForum(forumId);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


const updateQuestion = async (req, res) => {
    try {
      const { questionId } = req.params;
      const { content } = req.body;
      const result = await QuestionService.updateQuestion(questionId, content);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


const markQuestionAsCompleted = async (req, res) => {
    try {
      const { questionId } = req.params;
      const result = await QuestionService.markQuestionAsCompleted(questionId);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports = { 
    addQuestion,
    getQuestionsByForum, 
    updateQuestion, 
    markQuestionAsCompleted 
};
