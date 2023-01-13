const router = require('express').Router();

const authController = require('../controllers/authController');

router.route('/register')
    .get(authController.registerPage)
    .post(authController.register);

router.route('/login')
    .get(authController.loginPage)
    .post(authController.login);

router.get('/logout', authController.logout);

module.exports = router;