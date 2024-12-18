import { ApiService } from './../api.service';
import { Video } from './../types/video';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-to-watch',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './../catalog/catalog.component.html',
  styleUrl: './../catalog/catalog.component.css',
})
export class ToWatchComponent {
  videos: Video[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUserVideos().subscribe((videos) => {
      this.videos = videos;
    });
  }
}
