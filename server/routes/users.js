var express = require('express');
var controller = require('../controllers/usersController')
var router = express.Router();


router.get('', controller.find);
router.get('/:id', controller.findOne);
router.post('', controller.save);

module.exports = router;
