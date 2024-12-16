const { userModel, playlistModel, videoModel } = require('../models');

function newVideo(text, userId) {
  return videoModel.create({ text, userId }).then((video) => {
    return Promise.all([
      userModel.updateOne({ _id: userId }, { $push: { videos: video._id } }),
      // playlistModel.findByIdAndUpdate(
      //   { _id: playlistId },
      //   { $push: { videos: video._id }, $addToSet: { subscribers: userId } },
      //   { new: true }
      // ),
    ]);
  });
}

function getVideo(req, res, next) {
  const { videoId } = req.params;

  videoModel
    .findById(videoId)
    .populate('userId') // Populate user details if needed
    .then((video) => {
      if (!video) {
        // If no video is found, send a 404 response
        return res.status(404).json({ message: 'Video not found' });
      }

      // Send the video details as the response
      res.status(200).json(video);
    })
    .catch((err) => {
      // Log the error and pass it to the error-handling middleware
      console.error('Error fetching video:', err);
      next(err);
    });
}

function getLatestsVideos(req, res, next) {
  const limit = Number(req.query.limit) || 0;

  videoModel
    .find()
    .sort({ created_at: -1 })
    .limit(limit)
    // .populate('playlistId userId')
    .then((videos) => {
      res.status(200).json(videos);
    })
    .catch(next);
}

function createVideo(req, res, next) {
  const { title, videoUrl, description, imgUrl } = req.body;
  console.log(
    `title: ${title}, videoUrl: ${videoUrl}, description: ${description}, imgUrl: ${imgUrl}`
  );

  // const { _id: userId } = req.user;

  videoModel
    .create({ title, videoUrl, description, imgUrl })
    .then((video) => {
      return res.status(200).json(video);
    })
    // .then((updatedVideo) => {
    //   newVideo(title, videoUrl, description, imgUrl).then(([_, updatedVideo]) =>
    //     res.status(200).json(updatedVideo)
    //   );
    // })
    .catch((err) => res.status(500).json(err));
}

function editVideo(req, res, next) {
  const { videoId } = req.params;
  const { videoText } = req.body;
  const { _id: userId } = req.user;

  // if the userId is not the same as this one of the video, the video will not be updated
  videoModel
    .findOneAndUpdate(
      { _id: videoId, userId },
      { text: videoText },
      { new: true }
    )
    .then((updatedVideo) => {
      if (updatedVideo) {
        res.status(200).json(updatedVideo);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

function deleteVideo(req, res, next) {
  const { videoId } = req.params;
  const { _id: userId } = req.user;

  Promise.all([
    videoModel.findOneAndDelete({ _id: videoId, userId }),
    userModel.findOneAndUpdate({ _id: userId }, { $pull: { videos: videoId } }),
    playlistModel.findOneAndUpdate(
      // { _id: playlistId },
      { $pull: { videos: videoId } }
    ),
  ])
    .then(([deletedOne, _, __]) => {
      if (deletedOne) {
        res.status(200).json(deletedOne);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

function like(req, res, next) {
  const { videoId } = req.params;
  const { _id: userId } = req.user;

  videoModel
    .updateOne(
      { _id: videoId },
      { $addToSet: { likes: userId } },
      { new: true }
    )
    .then(() => res.status(200).json({ message: 'Liked successful!' }))
    .catch(next);
}

module.exports = {
  getVideo,
  getLatestsVideos,
  newVideo,
  createVideo,
  editVideo,
  deleteVideo,
  like,
};
