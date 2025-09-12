import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors} from '@angular/forms';
import {CategoryService} from '../../../../core/services/category-service';
import {Router} from '@angular/router';
import slugify from 'slugify';
import {serialize} from 'object-to-formdata';
import {NgIf} from '@angular/common';
import {FormErrorsComponent} from '../../../../shared/components/form-errors-component/form-errors-component';
import {handleValidation} from '../../../../shared/utils/forms.utils';

@Component({
  selector: 'app-categories-create-page',
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormErrorsComponent
  ],
  templateUrl: './categories-create-page.html',
  styleUrl: './categories-create-page.css'
})
export class CategoriesCreatePage {
  imagePreview: string | ArrayBuffer | null = null;


  categoryForm: FormGroup;

  constructor(private categoryService: CategoryService,
              private fb: FormBuilder,
              private router: Router) {

    this.categoryForm = this.fb.group({
      name: ['', this.requiredMessage('Назва є обов\'язковою')],
      slug: [''],
      imageFile: [null]
    });

    this.categoryForm.get('name')?.valueChanges.subscribe((value: string) => {
      this.categoryForm.get('slug')?.setValue(slugify(value || ''), {emitEvent: false});
    });
  }

  requiredMessage(message: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value ? {message} : null;
    };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        alert("Оберіть фото!");
        return;
      }
      this.categoryForm.patchValue({
        imageFile: file
      });
      this.categoryForm.get('imageFile')?.updateValueAndValidity();
      this.imagePreview = URL.createObjectURL(file);
    } else {
      this.categoryForm.patchValue({
        imageFile: null
      });
      this.imagePreview = null;
    }

  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }

    this.categoryService.createCategory(this.categoryForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        handleValidation(err, this.categoryForm);
      }
    });
  }
}
