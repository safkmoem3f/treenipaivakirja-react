const express = require('express');
const cors = require('cors');
const usersControllers = require('../controllers/user-controllers');

const router = express.Router();

router.use(cors());
router.post('/login', usersControllers.login);
router.post('/register', usersControllers.signup);

module.exports = router;
