import { Video } from './../types/video';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [FormsModule],
  providers: [ApiService],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css',
})
export class EditFormComponent implements OnInit {
  video: Video | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const videoId = this.route.snapshot.paramMap.get('videoId');

    if (videoId) {
      this.apiService.getSingleVideo(videoId).subscribe({
        next: (video) => (this.video = video),
        error: (err) => console.error(err),
      });
    }
  }

  updateVideo(form: NgForm) {
    if (form.invalid || !this.video) {
      console.error('Invalid form or video data is missing!');
      return;
    }

    const videoId = this.route.snapshot.paramMap.get('videoId');
    const { title, videoUrl, description, imgUrl } = form.value;

    this.apiService
      .updateVideo(videoId!, title, videoUrl, description, imgUrl)
      .subscribe(() => {
        this.router.navigate(['/catalog']);
      });
  }
}
