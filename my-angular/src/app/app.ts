import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LoaderComponent} from './shared/components/loader-component/loader-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular');
}
