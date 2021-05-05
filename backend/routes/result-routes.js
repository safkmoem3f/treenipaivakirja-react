const express = require('express');
const cors = require('cors');
const resultControllers = require('../controllers/result-controllers');
//const authCheck = require('../middleware/auth-check');

const router = express.Router();

router.use(cors());

router.get('/amateurs', resultControllers.findAllAmateur);
router.get('/professionals', resultControllers.findAllPro);
router.get('/', resultControllers.findAllPersonal);
router.post('/', resultControllers.findPersonal);

module.exports = router;
