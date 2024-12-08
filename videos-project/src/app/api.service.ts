import { Video } from './types/video';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  createVideo(
    title: string,
    videoUrl: string,
    description: string,
    img: string
  ) {
    const payload = { title, videoUrl, description, img };
    //TODO: fix api
    return this.http.post<Video>(`http://localhost:5000/api/videos`, payload);
  }
}
