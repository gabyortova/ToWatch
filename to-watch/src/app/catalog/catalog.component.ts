import { ApiService } from './../api.service';
import { Video } from './../types/video';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  videos: Video[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getVideos().subscribe((videos) => {
      this.videos = videos; 
    });
  }
}
