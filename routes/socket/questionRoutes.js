const express = require("express")
const router = express.Router()
const Question = require("../../controllers/socket/questionController")

router.post("/create-question/:userId/:forumId", Question.addQuestion)

router.post("/response-question/:userId/:questionId", Question.respondToQuestion)

router.get("/get-questions-by-forum/:forumId/", Question.getQuestionsByForum)

router.put("/update-question/:userId/:questionId", Question.updateQuestion)

router.post("/complete-question/:userId/:questionId", Question.closeQuestion)







module.exports = router;
