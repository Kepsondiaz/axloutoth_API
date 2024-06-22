const express = require('express');
const router = express.Router();
const Forum = require('../../controllers/socket/forumController');


router.post('/create-forum', Forum.createForum);


router.get('/get-all-forums', Forum.getAllForums);


router.get('/get-forum-by-id/:forumId', Forum.getForumById);


router.put('/update-forum/:forumId', Forum.updateForum);


//router.delete('/delete-forum/:forumId',Forum.deleteForum);

  
module.exports = router;




    

