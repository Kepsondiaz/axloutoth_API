const express = require('express');
const router = express.Router();
const Forum = require('../../controllers/socket/forumController');


router.post('/create-forum/:userId/:matiereId', Forum.createForum);


router.get('/get-all-forums', Forum.getAllForums);


router.get('/get-forum-by-id/:forumId', Forum.getForumById);


router.put('/update-forum/:userId/:matiereId/:forumId', Forum.updateForum);


router.delete('/delete-forum/:userId/:forumId', Forum.deleteForum);

  
module.exports = router;

