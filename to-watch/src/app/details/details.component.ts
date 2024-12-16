import { ApiService } from './../api.service';
import { Video } from './../types/video';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit{
  video = {} as Video;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['videoId'];

    this.apiService.getSingleVideo(id).subscribe((video) => {
      this.video = video;
    }); 
  }
}
