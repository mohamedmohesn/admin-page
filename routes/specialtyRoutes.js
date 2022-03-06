const { Router } = require('express');
const authController = require('../controllers/specialtyController');
const upload = require("../middleware/upload")
const Controller = require('../controllers/specialtyview');
const { requireAuth } = require('../middleware/admincheck');

const router = Router();

router.post('/addspecialty', (upload.single('imagespecialty')), authController.Add_specialty);
router.get('/findspecialty', authController.findALLspecialty);

router.get('/createspecialty',requireAuth, authController.create);

router.get('/specialty', requireAuth, Controller.allspecialtys);
router.get('/specialtydetails/:id', requireAuth, Controller.details);
router.delete('/deletespecialty/:id', Controller.specialtys_delete);

module.exports = router;