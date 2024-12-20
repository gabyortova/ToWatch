import { ErrorMsgService } from './../../core/error-msg/error-msg.service';
import { DOMAINS } from './../../constants';
import { EmailDirective } from './../../directives/email.directive';
import { UserService } from './../user.service';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, EmailDirective, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  domains = DOMAINS;

  constructor(
    private router: Router,
    private userService: UserService,
    private errorMsgService: ErrorMsgService
  ) {}

  login(form: NgForm) {
    if (form.invalid) {
      console.error('Invalid Login Form!');
      return;
    }

    const { email, pass: password } = form.value;

    this.userService.login(email, password).subscribe(() => {
      this.errorMsgService.setError(null);
      this.router.navigate(['/catalog']);
    });
  }
}
