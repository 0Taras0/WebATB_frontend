import {ICategory} from '../models/Interfaces';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  private apiUrl = `${environment.apiUrl}categories/`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.apiUrl + 'list');
  }

  createCategory(formData: FormData) {
    return this.http.post(this.apiUrl + 'create', formData);
  }
}
