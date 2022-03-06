const { Router } = require('express');
const authController = require('../controllers/userController');
const Controller = require('../controllers/userveiw');
const { requireAuth } = require('../middleware/admincheck');

const router = Router();

router.get('/createuser',requireAuth, authController.signup_get);

router.post('/signupclient', authController.signup_post);
router.get('/loginclient', authController.login_get);
router.post('/loginclient', authController.login_post);
router.get('/logoutclient', authController.logout_get);
router.post('/forgetc', authController.forgetpass);
router.post('/resetc/:token', authController.resetpass);
router.get('/forget', authController.forget_get);
router.get('/reset', authController.reset_get);

router.get('/users', requireAuth, Controller.alluser);
router.get('/userdetails/:id', requireAuth, Controller.details);
router.delete('/deleteuser/:id', Controller.user_delete);
module.exports = router;  