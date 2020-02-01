var express = require('express');
var controller = require('../controllers/auctionsController')
var router = express.Router();


router.get('/search', controller.search);
router.get('', controller.find);
router.get('/:id', controller.findOne);
router.post('', controller.save);

module.exports = router;
