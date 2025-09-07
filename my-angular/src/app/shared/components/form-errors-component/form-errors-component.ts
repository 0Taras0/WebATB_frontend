import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-form-errors-component',
  imports: [KeyValuePipe, NgForOf, NgIf],
  templateUrl: './form-errors-component.html',
  styleUrl: './form-errors-component.css'
})
export class FormErrorsComponent {
  @Input() control!: AbstractControl | null;
}
