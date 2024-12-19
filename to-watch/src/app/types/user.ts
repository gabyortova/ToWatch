export interface User {
  _id: string;
  username: string;
  pass: string;
  email: string;
  videos: string[];
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface UserForAuth {
  _id: string;
  username: string;
  email: string;
  pass: string;
}

export interface ProfileDetails {
  username: string;
  email: string; 
}