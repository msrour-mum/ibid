var express = require('express');
var controller = require('../controllers/auctionsController');
var commentsController = require('../controllers/commentsController');
var router = express.Router();
const authGaurd = require('../middelwares/authGaurd');
const uploader = require('../middelwares/uploader');


router.get('/topUsers', controller.topUsers);
router.get('/infiniteScroll', controller.findInfiniteScroll);
router.get('/search', authGaurd, controller.search);
router.get('', authGaurd, controller.find);
router.get('/:id', authGaurd, controller.findOne);
router.post('', authGaurd,
    uploader.single('photo'),
    controller.save);

router.post('/:id/bids', controller.addBid);
router.post('/:id/likes', controller.like);

router.get('/users/:id/auctions', authGaurd, controller.findUserAuction);

router.get('/:id/comments', commentsController.find);
router.post('/:id/comments', commentsController.save);

module.exports = router;
