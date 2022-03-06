const { Router } = require('express');
const authController = require('../controllers/admincontroller');

const router = Router();

router.post('/addadmin',authController.signup_post);
router.post('/login',authController.login_post);
router.get('/logout',authController.logout_get);


module.exports = router;