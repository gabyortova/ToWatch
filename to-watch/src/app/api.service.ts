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
    return this.http.get<Video[]>(`http://localhost:5000/api/videos`, { withCredentials: true });
  }

  getSingleVideo(id: string) {
    return this.http.get<Video>(`/api/videos/${id}`, { withCredentials: true });
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
    return this.http.post<Video>(`http://localhost:5000/api/videos`, video, {
      withCredentials: true,
    });
  }

  updateVideo(
    videoId: string,
    title: string,
    videoUrl: string,
    description: string,
    imgUrl: string
  ) {
    const video = { title, videoUrl, description, imgUrl };
    return this.http.put<Video>(`http://localhost:5000/api/videos/${videoId}`, video, { withCredentials: true });
  }

  // deleteVideo(videoId: string, postId: string) {
  //   return this.http.delete(`/api/videos/${videoId}`);
  // }
}
