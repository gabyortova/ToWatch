import { Playlist } from './playlist';
import { User } from './user';

export interface Video {
  title: string;
  description: string;
  videoUrl: string;
  imgUrl: string;
  _id: string;
  userId: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}
