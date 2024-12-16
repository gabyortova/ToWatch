/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserForAuth } from './../types/user';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();

  USER_KEY = '[user]';
  user: UserForAuth | null = null;
  userSubscription: Subscription | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  register(
    username: string,
    email: string,
    pass: string,
    rePass: string
  ) {
    return this.http
      .post<UserForAuth>('http://localhost:5000/api/register', {
        username, 
        email,
        pass,
        rePass,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>('http://localhost:5000/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .post('http://localhost:5000/api/logout', {})
      .pipe(tap((user) => this.user$$.next(null))
      );
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
