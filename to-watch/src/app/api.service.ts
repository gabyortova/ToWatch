import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from './types/video';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getVideos() {
    return this.http.get<Video[]>(`http://localhost:5000/api/videos`);
  }

  getSingleVideo(id: string) {
    return this.http.get<Video>(`http://localhost:5000/api/videos/${id}`);
  }

  createVideo(
    title: string,
    videoUrl: string,
    description: string,
    imgUrl: string
  ) {
    const payload = { title, videoUrl, description, imgUrl };
    //TODO: fix
    return this.http.post<Video>(`http://localhost:5000/api/videos`, payload);
  }

  updateVideo(videoId: string, title: string, videoUrl: string, description: string, imgUrl: string) {
    const payload = { title, videoUrl, description, imgUrl};
    return this.http.put<Video>(`http://localhost:5000/api/videos/${videoId}`, payload);
  }
}
