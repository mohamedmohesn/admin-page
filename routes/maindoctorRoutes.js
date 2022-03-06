const { Router } = require('express');
const authController = require('../controllers/maindoctorController');
const upload = require("../middleware/upload")
const Controller = require('../controllers/main');

const router = Router();

router.post('/signupMainDoctor', upload.fields([{name:'imagedoctor'},{name:'imageSSN'}]),authController.signup_post);
router.post('/loginMainDoctor', authController.login_post);
router.get('/logoutMainDoctor', authController.logout_get);
router.get('/getAllMainDoctor',authController.getALL);
router.get('/getnameMainDoctor',authController.getALLName);
router.get('/getAOEMainDoctor',authController.getALLAOE);

router.get('/viewmaindoctors', Controller.create);
router.post('/createmainDoctor',  upload.fields([{name:'imagedoctor'},{name:'imageSSN'}]),Controller.add);

router.get('/maindoctor', Controller.alldoctor);
router.get('/doctormaindetails/:id', Controller.details);
router.delete('/deletemaindoctor/:id', Controller.doctor_delete);


module.exports = router;

