const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const pwdValidator = require('../middleware/password');

router.post('/signup', pwdValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;