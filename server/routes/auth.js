const express = require('express');
const authController = require('../controllers/authController')
const router = express.Router();
const uploader = require('../middelwares/uploader');

router.post('/signup',
    uploader.single('photo'),
    authController.register);

router.post('/login', authController.authenticate);

module.exports = router;
