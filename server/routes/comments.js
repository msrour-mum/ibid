
var express = require('express');
var controller = require('../controllers/commentsController')
var router = express.Router();


router.get('', controller.find);
router.post('', controller.save);

module.exports = router;
