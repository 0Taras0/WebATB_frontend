import {Component, inject, OnInit} from '@angular/core';
import {Category} from '../../../categories/models/category.interfaces';
import { environment } from "../../../../../environments/environment";
import {CategoryService} from '../../../../core/services/category-service';
import {Router, RouterLink} from '@angular/router';
import {ImagePathPipe} from '../../../../shared/pipes/image-path-pipe';
import {finalize} from 'rxjs/operators';
import {DialogModalComponent} from '../../../../shared/components/dialog-modal-component/dialog-modal-component';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    ImagePathPipe,
    DialogModalComponent
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit {
  private router = inject(Router);
  private categoryService = inject(CategoryService);

  categories: Category[] = [];
  isDeleteModalOpen = false;
  idToDelete: number = -1;
  protected readonly environment = environment;

  ngOnInit(): void {
    console.log("Home page on init");
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log("Categories", categories);
    });
  }

  editCategory(id: number) {
    this.router.navigate(['/category/edit', id]);
  }

  onDeleteModalSubmitted() {
    this.categoryService.deleteCategory(this.idToDelete.toString()).pipe(
      finalize(() => {
        this.isDeleteModalOpen = false;
        this.idToDelete = -1;
        this.getCategories();
      })
    ).subscribe();
  }
}
