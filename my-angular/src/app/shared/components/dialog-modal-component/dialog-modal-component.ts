import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dialog-modal-component',
  imports: [],
  templateUrl: './dialog-modal-component.html',
  styleUrl: './dialog-modal-component.css'
})
export class DialogModalComponent {
  @Input() title = 'Модалка';
  @Input() isOpen = false;

  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }

  submit() {
    this.submitted.emit();
    this.close();
  }
}
