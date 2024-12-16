/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constants';
import { matchPasswordsValidator } from '../../utils/match-passwords.validator';
 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  domains = DOMAINS;

  constructor(private userService: UserService, private router: Router) {}

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const {
      username,
      email,
      pass,
      rePass,
    } = form.value;

    this.userService
      .register(username, email, pass, rePass)
      .subscribe(() => {
        this.router.navigate(['/catalog']);
      });
  }
}
