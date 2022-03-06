const { Router } = require('express');
const authController = require('../controllers/pharmcyController');

const router = Router();

router.post('/addpharmcy',authController.Add_pharmcy);
router.get('/findall',authController.findALL);

module.exports = router;
