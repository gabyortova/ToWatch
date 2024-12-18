const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');
const { refreshToken } = require('../utils/jwt.js');

router.get('/profile', auth(),authController.getProfileInfo);
router.put('/profile', auth(),authController.editProfileInfo);

router.post('/refresh-token', refreshToken);

module.exports = router