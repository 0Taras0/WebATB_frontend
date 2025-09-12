import {Component, inject} from '@angular/core';
import {AuthService} from '../../../../core/services/auth-service';
import {RegisterModel} from '../../models/auth.interfaces';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {handleValidation} from '../../../../shared/utils/forms.utils';
import {Router} from '@angular/router';
import {FormErrorsComponent} from '../../../../shared/components/form-errors-component/form-errors-component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register-page',
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormErrorsComponent
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage {
  imagePreview: string | ArrayBuffer | null = null;
  registerForm: FormGroup;
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
        firstName: ['', this.requiredMessage('Ім\'я є обов\'язковою')],
        lastName: ['', this.requiredMessage('Прізвище є обов\'язковим')],
        email: ['', [
          this.requiredMessage('Пошта є обов\'язковою'),
          this.patternMessage(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Невірний формат email')
        ]],
        password: ['', [
          this.requiredMessage('Пароль є обов\'язковим'),
          this.minLengthMessage(6, 'Пароль повинен містити мінімум 6 символів')
        ]],
        confirmPassword: ['', this.requiredMessage('Підтвердження паролю є обов\'язковим')],
        imageFile: [null]
      },
      { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordMismatch: true};
  }

  requiredMessage(message: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value ? {message} : null;
    };
  }

  minLengthMessage(length: number, message: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length < length) {
        return { message };
      }
      return null;
    };
  }

  maxLengthMessage(length: number, message: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length > length) {
        return { message };
      }
      return null;
    };
  }

  patternMessage(regex: RegExp, message: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && !regex.test(control.value)) {
        return { message };
      }
      return null;
    };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        alert("Оберіть фото!");
        return;
      }
      this.registerForm.patchValue({
        imageFile: file
      });
      this.registerForm.get('imageFile')?.updateValueAndValidity();
      this.imagePreview = URL.createObjectURL(file);
    } else {
      this.registerForm.patchValue({
        imageFile: null
      });
      this.imagePreview = null;
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const formValue = this.registerForm.value;

    const registerModel: RegisterModel = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
      imageFile: formValue.imageFile
    };


    this.authService.register(registerModel).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        handleValidation(err, this.registerForm);
      }
    });
  }
}
