import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from './types/video';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private router: Router) {}

  // private refreshToken() {
  //   return this.http.post<{ accessToken: string }>(
  //     'http://localhost:5000/api/users/refresh-token',
  //     {},
  //     { withCredentials: true }
  //   );
  // }

  getVideos() {
    return this.http.get<Video[]>('/api/videos');
  }

  getSingleVideo(id: string) {
    return this.http.get<Video>(`/api/videos/${id}`);
  }

  createVideo(
    title: string,
    videoUrl: string,
    description: string,
    imgUrl: string
  ) {
    // const payload = { title, videoUrl, description, imgUrl };

    // return this.http
    //   .post<Video>('http://localhost:5000/api/videos', payload, {
    //     withCredentials: true,
    //   })
    //   .toPromise()
    //   .catch(this.handleError.bind(this));

    const video = { title, videoUrl, description, imgUrl };
    //TODO: fix
    return this.http.post<Video>(`/api/videos`, video);
  }

  updateVideo(
    videoId: string,
    title: string,
    videoUrl: string,
    description: string,
    imgUrl: string
  ) {
    const video = { title, videoUrl, description, imgUrl };
    return this.http.put<Video>(`/api/videos/${videoId}`, video);
  }

  deleteVideo(videoId: string) {
    return this.http.delete(`/api/videos/${videoId}`);
  }
}
