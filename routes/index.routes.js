const express = require("express");
const session = require('express-session');

const router = express.Router();


const homeController = require('../controllers/home.controller');

router.get('/', homeController.getLoginPage);
router.get('/signup', homeController.getSignupPage);
router.get('/home', homeController.getHomePage);
router.get('/admin', homeController.getAdminPage);
router.get('/admin2', homeController.getAdminAppointmentPage);


router.post('/', homeController.getLogin);
router.post('/signup', homeController.getSignup);


module.exports = router;
