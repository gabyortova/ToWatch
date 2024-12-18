const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { videoController } = require('../controllers');

// middleware that is specific to this router

router.get('/', videoController.getLatestsVideos);
router.post('/', auth(), videoController.createVideo);


// router.get('/user/:userId', videoController.getUserVideos);
router.get('/:videoId', videoController.getVideo);

router.put('/:videoId', auth(), videoController.editVideo);
router.delete('/:videoId', auth(), videoController.deleteVideo);

module.exports = router;
