export interface User {
  _id: string;
  username: string;
  pass: string;
  email: string;
  phone: string;
  videos: string[];
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface UserForAuth {
  _id: string;
  username: string;
  email: string;
  phone?: string;
  pass: string;
}