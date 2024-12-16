import { Video } from './video';
import { User } from './user';

export interface Playlist {
  videos: Video[];
  _id: string;
  playlistName: string;
  userId: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}
