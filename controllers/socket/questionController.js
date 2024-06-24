const QuestionService = require("../../services/socket/questionService")

const addQuestion = async (req) => {
  try {
    const { userId, forumId } = req.params;
    const { content } = req.body;
    const result = await QuestionService.addQuestion(userId, forumId, content);
    return result;
  } catch (err) {
    throw err;
  }
};

const getQuestionsByForum = async (req) => {
  try {
    const { forumId } = req.params;
    const questions = await QuestionService.getQuestionsByForum(forumId);
    return questions;
  } catch (err) {
    throw err;
  }
};

const updateQuestion = async (req) => {
  try {
    const { userId, questionId } = req.params;
    const { content } = req.body;
    const result = await QuestionService.updateQuestion(userId, questionId, content);
    return result;
  } catch (err) {
    throw err;
  }
};

const respondToQuestion = async (req) => {
  try {
    const { userId, questionId } = req.params;
    const result = await QuestionService.respondToQuestion(userId, questionId);
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteQuestion = async (req) => {
  try {
    const { userId, questionId } = req.params;
    const result = await QuestionService.deleteQuestion(userId, questionId);
    return result;
  } catch (err) {
    throw err;
  }
};

const closeQuestion = async (req) => {
  try {
    const { userId, questionId } = req.params;
    const result = await QuestionService.closeQuestion(userId, questionId);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addQuestion,
  getQuestionsByForum,
  updateQuestion,
  respondToQuestion,
  deleteQuestion,
  closeQuestion,
};