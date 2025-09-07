import {Component, computed, inject} from '@angular/core';
import {LoadingService} from '../../../core/services/loading-service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-loader-component',
  imports: [
    NgIf
  ],
  templateUrl: './loader-component.html',
  styleUrl: './loader-component.css'
})
export class LoaderComponent {
  private loadingService = inject(LoadingService);
  isLoading = computed(() => this.loadingService.loading());
}
