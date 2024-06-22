const express = require("express")
const router = express.Router()
const Question = require("../../controllers/socket/questionController")

router.post("/create-question/:forumId", Question.addQuestion)

router.get("/get-questions-by-forum/:forumId/", Question.getQuestionsByForum)

router.put("/update-question/:questionId", Question.updateQuestion)

router.post("/complete-question/:questionId", Question.markQuestionAsCompleted)





module.exports = router;
