const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const sauceCtrl = require('../controllers/sauce');

router.post('/',auth, multer, sauceCtrl.createSauce);
router.get('/', multer, sauceCtrl.displaySauce);
router.get('/:id', multer, sauceCtrl.displayOneSauce);
router.put('/:id',auth, multer, sauceCtrl.updateSauce);
router.delete('/:id',auth, multer, sauceCtrl.deleteSauce);


module.exports = router;