import { ErrorMsgService } from './../core/error-msg/error-msg.service';
import { EmailDirective } from './../directives/email.directive';
import { DOMAINS } from './../constants';
import { NgForm, FormsModule } from '@angular/forms';
import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';
import { ProfileDetails } from './../types/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, EmailDirective],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  isEditMode: boolean = false;

  profileDetails: ProfileDetails = {
    username: '',
    email: '',
  };

  domains = DOMAINS;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const { username, email } = this.userService.user!;
    this.profileDetails = { username, email };
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  handleSaveProfile(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { username, email } = form.value;

    this.userService.updateProfile(username, email).subscribe(() => {
      this.profileDetails = { username, email };
      this.toggleEditMode();
    });
  }

  onCancel(event: Event, form: NgForm) {
    event.preventDefault();
    form.resetForm(this.profileDetails);
    this.toggleEditMode();
  }
}
