import { Playlist } from './playlist';
import { User } from './user';

export interface Video {
  title: string;
  description: string;
  videourl: string;
  imgUrl: string;
  likes: string[];
  _id: string;
  text: string;
  userId: User;
  playlistId: Playlist;
  created_at: string;
  updatedAt: string;
  __v: number;
}
