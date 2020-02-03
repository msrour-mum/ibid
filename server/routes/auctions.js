var express = require('express');
var controller = require('../controllers/auctionsController')
var router = express.Router();
const authGaurd = require('../middelwares/authGaurd');

router.get('/search', authGaurd, controller.search);
router.get('', authGaurd, controller.find);
router.get('/:id', authGaurd, controller.findOne);
router.post('', authGaurd, controller.save);

module.exports = router;
