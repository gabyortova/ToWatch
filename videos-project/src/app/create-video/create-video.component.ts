/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';

import { Component } from '@angular/core';
import { ApiService } from './../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-video',
  standalone: true,
  imports: [FormsModule],
  providers: [ApiService],
  templateUrl: './create-video.component.html',
  styleUrl: './create-video.component.css',
})
export class CreateVideoComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  addVideo(form: NgForm) {
    if (form.invalid) {
      console.log('invalid');
      return;
    }

    const { title, videoUrl, description, img } = form.value;
    console.log(form.value);
    

    this.apiService.createVideo(title, videoUrl, description, img).subscribe(() => {
      this.router.navigateByUrl('/catalog');
    });
  }
}