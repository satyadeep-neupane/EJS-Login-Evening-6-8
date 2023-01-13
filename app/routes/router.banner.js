const router = require('express').Router();
const bannerController = require('../controllers/bannerController');

router.route('/')
    .get(bannerController.list)
    .post(bannerController.store);

router.get('/create', bannerController.create);

router.post('/:id/delete', bannerController.destory);

module.exports = router;