import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../../environments/environment';

@Pipe({
  name: 'imagePath',
  standalone: true
})
export class ImagePathPipe implements PipeTransform {
  transform(value: string): string {
    if (!value)
      return 'https://i.giphy.com/1zSz5MVw4zKg0.webp';
    return `${environment.imagePath800}${value}`;
  }
}
