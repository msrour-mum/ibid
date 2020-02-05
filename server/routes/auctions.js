var express = require('express');
var controller = require('../controllers/auctionsController');
var router = express.Router();
const authGaurd = require('../middelwares/authGaurd');
const uploader = require('../middelwares/uploader');

router.get('/search', authGaurd, controller.search);
router.get('', authGaurd, controller.find);
router.get('/:id', authGaurd, controller.findOne);
router.post('', authGaurd,
    uploader.single('photo'),
    controller.save);

router.post('/:id/bids', controller.addBid);
router.post('/:id/likes', controller.like);

router.get('/users/:id/auctions', authGaurd, controller.findUserAuction);

module.exports = router;
