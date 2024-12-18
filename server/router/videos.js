const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { videoController } = require('../controllers');

// middleware that is specific to this router

router.get('/', videoController.getLatestsVideos);
router.post('/', auth(), videoController.createVideo);

router.get('/:videoId', videoController.getVideo);
router.put('/:videoId', auth(), videoController.editVideo);


module.exports = router;