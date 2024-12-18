import { UserService } from './../user/user.service';
import { ApiService } from './../api.service';
import { Video } from './../types/video';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  video = {} as Video;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['videoId'];

    this.apiService.getSingleVideo(id).subscribe((video) => {
      this.video = video;
    });
  }

  onDelete() {
    this.apiService.deleteVideo(this.video._id).subscribe(() => {
      this.router.navigate(['/my-videos']);
    });
  }
  
  get userId(): string {
    return this.userService.user?._id || '';
  }

  canManipulate() {
    const isOwner = this.userId === this.video.userId;
    console.log(`is owner: ${isOwner}`);
    return isOwner;
  }
}
