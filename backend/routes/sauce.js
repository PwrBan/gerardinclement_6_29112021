const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const sauceCtrl = require('../controllers/sauce.ctrl');

router.post('/',auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
router.get('/', multer, sauceCtrl.findAllSauce);
router.get('/:id', multer, sauceCtrl.findByIdSauce);
router.put('/:id',auth, multer, sauceCtrl.updateSauce);
router.delete('/:id',auth, multer, sauceCtrl.deleteSauce);



module.exports = router;