const express = require("express");

const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/signup', userController.getSignupPage);
router.get('/login', userController.getLoginPage);

router.post('/signup', userController.getSignup);
router.post('/login', userController.getLogin);

module.exports = router;
