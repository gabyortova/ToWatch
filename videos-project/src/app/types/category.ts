import { Video } from './video';
import { User } from './user';

export interface Category {
  videos: Video[];
  _id: string;
  categoryName: string;
  userId: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}
