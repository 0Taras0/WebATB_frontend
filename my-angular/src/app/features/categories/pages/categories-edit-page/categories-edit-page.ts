import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors
} from '@angular/forms';
import { environment } from "../../../../../environments/environment";
import {CategoryService} from '../../../../core/services/category-service';
import {ActivatedRoute, Router} from '@angular/router';
import slugify from 'slugify';
import {serialize} from 'object-to-formdata';
import {NgIf} from '@angular/common';
import {FormErrorsComponent} from '../../../../shared/components/form-errors-component/form-errors-component';
import {handleValidation} from '../../../../shared/utils/forms.utils';

@Component({
  selector: 'app-categories-edit-page',
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormErrorsComponent
  ],
  templateUrl: './categories-edit-page.html',
  styleUrl: './categories-edit-page.css'
})
export class CategoriesEditPage implements OnInit {

  id: string = '';

  imagePreview: string | ArrayBuffer | null = null;

  categoryForm: FormGroup;
  protected readonly environment = environment;

  constructor(private categoryService: CategoryService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.categoryForm = this.fb.group({
      id: [''],
      name: ['', this.requiredMessage('Назва є обов\'язковою')],
      slug: [''],
      imageFile: [null]
    });

    this.categoryForm.get('name')?.valueChanges.subscribe((value: string) => {
      this.categoryForm.get('slug')?.setValue(slugify(value || ''), {emitEvent: false});
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.categoryForm.patchValue({
      id: this.id
    })

    this.categoryService.getCategory(this.id).subscribe(category => {
      this.categoryForm.patchValue({
        name: category.name,
        slug: category.slug
      });
      if (category.image){
        this.loadImagePreview(`${environment.imagePath400}${category.image}`);
      }
    });
  }

  requiredMessage(message: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value ? {message} : null;
    };
  }

  async loadImagePreview(url: string) {
    const blob = await this.urlToBlob(url);
    this.imagePreview = URL.createObjectURL(blob);
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

    this.categoryService.editCategory(this.categoryForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        handleValidation(err, this.categoryForm);
      }
    });
  }

  private async urlToBlob(url: string): Promise<Blob> {
    const response = await fetch(url);
    return await response.blob();
  }
}
