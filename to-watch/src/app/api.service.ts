import { UserService } from './user/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from './types/video';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  getVideos() {
    return this.http.get<Video[]>('/api/videos');
  }

  get userId(): string {
    return this.userService.user?._id || '';
  }
  
  getUserVideos() {
    return this.http.get<Video[]>(`/api/videos/user/${this.userId}`);
  }

  getSingleVideo(id: string) {
    return this.http.get<Video>(`/api/videos/${id}`);
  }

  createVideo(
    title: string,
    videoUrl: string,
    description: string,
    imgUrl: string,
    isPublic: boolean
  ) {
    const video = { title, videoUrl, description, imgUrl, isPublic };

    return this.http.post<Video>(`/api/videos`, video);
  }

  updateVideo(
    videoId: string,
    title: string,
    videoUrl: string,
    description: string,
    imgUrl: string,
    isPublic: boolean
  ) {
    const video = { title, videoUrl, description, imgUrl, isPublic };
    return this.http.put<Video>(`/api/videos/${videoId}`, video);
  }

  deleteVideo(videoId: string) {
    return this.http.delete(`/api/videos/${videoId}`);
  }
}
