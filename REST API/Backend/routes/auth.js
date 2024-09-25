const express = require('express');
const {body} = require('express-validator/check');
const authController = require('../controllers/auth');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const uservalidation = require('../validation/UserValidation');
router.post('/signup',uservalidation.uservalidation,authController.signup);
router.post('/login',authController.postlogin);
router.get('/status',isAuth,authController.getUserStatus);
router.patch('/status',isAuth,[
    body('status').trim().not().isEmpty()
],authController.newUserStatus);
module.exports = router;
