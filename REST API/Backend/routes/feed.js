const express = require('express');
const router = express.Router();
const {body}=require('express-validator');
const feedController = require('../controllers/feed');
// const {createpostValidation} = require('../validation/validation');
const {createpostValidation}=require('../validation/validation');
// GET /feed/posts
router.get('/posts',feedController.getposts);

// POST /feed/post
router.post('/post',createpostValidation,feedController.createposts);
// router.route('/post').post(createpostValidation,feedController.createposts);

router.get("/post/:postId",feedController.getpost);

router.put('/post/:postId',createpostValidation,feedController.updatePost); 

router.delete('/post/:postId',);
module.exports = router;