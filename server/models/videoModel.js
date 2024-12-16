const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: false,
    },
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    // playlistId: {
    //     type: ObjectId,
    //     ref: "Playlist"
    // },
  },
  { timestamps: { createdAt: 'created_at' } }
);

module.exports = mongoose.model('Video', videoSchema);