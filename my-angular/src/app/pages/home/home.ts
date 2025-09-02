import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ICategory} from '../../models/Interfaces';
import {CommonModule} from '@angular/common';
import {environment} from '../../../environments/environment';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  //Це наш список категорій
  categories: ICategory[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    console.log("Home page on init");
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log("Categories", categories);
    });
  }

  protected readonly environment = environment;
}
