const { Router } = require('express');
const authController = require('../controllers/pharmcyController');
const upload = require("../middleware/upload")
const Controller = require('../controllers/pharmcyveiw');
const { requireAuth } = require('../middleware/admincheck');

const router = Router();

router.post('/addpharmcy', (upload.single('imagepharmcy')),authController.Add_pharmcy);
router.get('/findall',authController.findALL);

router.get('/viewpharmcys',requireAuth, Controller.create);
router.post('/createpharmcy', (upload.single('imagepharmcy')),Controller.Addpharmcy);


router.get('/pharmcys',requireAuth, Controller.allpharmcy);
router.get('/pharmcydetails/:id', requireAuth, Controller.details);
router.delete('/deletepharmcy/:id', Controller.pharmcy_delete);

module.exports = router;
