const { Router } = require('express');
const authController = require('../controllers/userController');

const router = Router();

router.get('/signupclient', authController.signup_get);
router.post('/signupclient', authController.signup_post);
router.get('/loginclient', authController.login_get);
router.post('/loginclient', authController.login_post);
router.get('/logoutclient', authController.logout_get);
router.post('/forgetc', authController.forgetpass);
router.post('/resetc', authController.resetpass);

module.exports = router;