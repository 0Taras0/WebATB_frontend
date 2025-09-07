import {Category} from '../../features/categories/models/category.interfaces';
import { Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api-service';

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

  editCategory(formData: FormData) {
    return this.api.put(`${this.apiUrl}update`, formData);
  }

  createCategory(formData: FormData) {
    return this.api.post(`${this.apiUrl}create`, formData);
  }

  deleteCategory(id: string) {
    return this.api.delete(`${this.apiUrl}delete/${id}`);
  }
}
