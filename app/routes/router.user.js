const router = require('express').Router();
const userController = require('../controllers/userController');

router.route('/')
    .get(userController.list)
    .post(userController.store);

router.get('/create', userController.create);

router.post('/:id/delete', userController.destory);

module.exports = router;