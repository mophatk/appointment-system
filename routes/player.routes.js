const fs = require('fs');
const express = require("express");

const router = express.Router();

const playerController = require('../controllers/players.controller')

router.get('/add', playerController.addPlayerPage);
router.get('/approve/:id', playerController.approvePlayerPage);
router.get('/delete/:id', playerController.deletePlayer);
router.get('/set/:id', playerController.approveAppointmentPage);
router.get('/delete/:id', playerController.deletePlayer);
router.get('/book', playerController.bookAppointmentPage)
router.post('/add', playerController.addPlayer);
router.post('/book', playerController.bookAppointment)

module.exports = router;
