const express = require('express');
const resultControllers = require('../controllers/result-controllers');
//const authCheck = require('../middleware/auth-check');

const router = express.Router();

router.get('/amateurs', resultControllers.findAllAmateur);
router.get('/professionals', resultControllers.findAllPro);
router.get('/', resultControllers.findAllPersonal);
router.post('/', resultControllers.findPersonal);

module.exports = router;
