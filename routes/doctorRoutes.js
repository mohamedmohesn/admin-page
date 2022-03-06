const { Router } = require('express');
const authController = require('../controllers/doctorController');
const upload = require("../middleware/upload")
const Controller = require('../controllers/doctorveiw');
const { requireAuth } = require('../middleware/admincheck');

const router = Router();

// router.get('/signupDoctor', authController.signup_get);
router.post('/signupDoctor', upload.fields([{name:'imagedoctor'},{name:'imageSSN'}])  ,authController.signup_post);
// router.get('/loginDoctor', authController.login_get);
router.post('/loginDoctor', authController.login_post);
router.post('/logoutDoctor', authController.logout_get);
router.get('/getAllDoctor',authController.getALL);
router.get('/getnameDoctor',requireAuth,authController.getALLName);
router.post('/getAOEDoctor',authController.getALLAOE);

router.get('/getDoctor/:id',requireAuth,authController.getAOE);
router.get('/viewdoctors', requireAuth, Controller.create);
router.post('/createDoctor',  upload.fields([{name:'imagedoctor'},{name:'imageSSN'}]),Controller.add);
router.post('/mainCreate/:id', Controller.main_create);

router.get('/doctor',requireAuth, Controller.alldoctor);
router.get('/doctordetails/:id', requireAuth, Controller.details);
router.delete('/deletedoctor/:id', Controller.doctor_delete);

module.exports = router;

