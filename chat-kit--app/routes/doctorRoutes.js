const { Router } = require('express');
const authController = require('../controllers/doctorController');
const upload = require("../middleware/upload")

const router = Router();

router.get('/signupDoctor', authController.signup_get);
router.post('/signupDoctor', (upload.single('imagedoctor')),authController.signup_post);
router.get('/loginDoctor', authController.login_get);
router.post('/loginDoctor', authController.login_post);
router.get('/logoutDoctor', authController.logout_get);
router.get('/getAllDoctor',authController.getALL);
router.get('/getnameDoctor',authController.getALLName);
router.get('/getAOEDoctor',authController.getALLAOE);

module.exports = router;

