const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { videoController } = require('../controllers');

// middleware that is specific to this router

router.get('/', videoController.getLatestsVideos);
router.post('/', videoController.createVideo);

module.exports = router;