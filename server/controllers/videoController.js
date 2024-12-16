const { userModel, playlistModel, videoModel } = require('../models');

function newVideo(text, userId, playlistId) {
  return videoModel.create({ text, userId, playlistId }).then((video) => {
    return Promise.all([
      userModel.updateOne(
        { _id: userId },
        { $push: { videos: video._id }, $addToSet: { playlists: playlistId } }
      ),
      playlistModel.findByIdAndUpdate(
        { _id: playlistId },
        { $push: { videos: video._id }, $addToSet: { subscribers: userId } },
        { new: true }
      ),
    ]);
  });
}

function getLatestsVideos(req, res, next) {
  const limit = Number(req.query.limit) || 0;

  videoModel
    .find()
    .sort({ created_at: -1 })
    .limit(limit)
    .populate('playlistId userId')
    .then((videos) => {
      res.status(200).json(videos);
    })
    .catch(next);
}

// function createVideo(req, res, next) {
//     const { playlistId } = req.params;
//     const { _id: userId } = req.user;
//     const { videoText } = req.body;

//     newVideo(videoText, userId, playlistId)
//         .then(([_, updatedPlaylist]) => res.status(200).json(updatedPlaylist))
//         .catch(next);
// }

function createVideo(req, res, next) {
  const { title, videoUrl, description, img } = req.body;
  console.log(
    `title: ${title}, videoUrl: ${videoUrl}, description: ${description}, img: ${img}`
  );

  console.log('creating');

  // const { _id: userId } = req.user;

  videoModel
    .create({ title, videoUrl, description, img })
    .then((video) => {
      console.log(`then video: ${video}`);
      return res.status(200).json(video);
    })
    // .then((updatedVideo) => {
    //   newVideo(title, videoUrl, description, img).then(([_, updatedVideo]) =>
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
  const { videoId, playlistId } = req.params;
  const { _id: userId } = req.user;

  Promise.all([
    videoModel.findOneAndDelete({ _id: videoId, userId }),
    userModel.findOneAndUpdate({ _id: userId }, { $pull: { videos: videoId } }),
    playlistModel.findOneAndUpdate(
      { _id: playlistId },
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

  console.log('like');

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
  getLatestsVideos,
  newVideo,
  createVideo,
  editVideo,
  deleteVideo,
  like,
};
