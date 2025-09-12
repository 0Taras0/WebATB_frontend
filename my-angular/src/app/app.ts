import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LoaderComponent} from './shared/components/loader-component/loader-component';
import {AuthService} from './core/services/auth-service';
import {environment} from "../environments/environment";
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgIf, RouterOutlet, RouterLink, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  authService = inject(AuthService);
  protected readonly title = signal('my-angular');
  protected readonly environment = environment;

  get isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  get user() {
    return this.authService.user;
  }
}
