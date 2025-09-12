import {Category, CategoryCreate, CategoryEdit} from '../../features/categories/models/category.interfaces';
import { Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api-service';
import {serialize} from 'object-to-formdata';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  private apiUrl = `categories/`;

  constructor(private api: ApiService) {}

  getCategories(): Observable<Category[]> {
    return this.api.get<Category[]>(`${this.apiUrl}list`);
  }

  getCategory(id: string): Observable<Category> {
    return this.api.get<Category>(`${this.apiUrl}getById/${id}`);
  }

  editCategory(category: CategoryEdit) {
    const formData = serialize(category);
    return this.api.put(`${this.apiUrl}update`, formData);
  }

  createCategory(category: CategoryCreate) {
    const formData = serialize(category);
    return this.api.post(`${this.apiUrl}create`, formData);
  }

  deleteCategory(id: string) {
    return this.api.delete(`${this.apiUrl}delete/${id}`);
  }
}
