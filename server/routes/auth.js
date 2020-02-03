const express = require('express');
const authController = require('../controllers/authController')
const router = express.Router();

router.post('/signup', authController.save);
router.post('/login', authController.authenticate);//ToDo: to be implemented later in login task

module.exports = router;
