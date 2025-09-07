import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/pages/home-page/home-page').then(m => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register-page/register-page').then(m => m.RegisterPage)
  },
  {
    path: 'category',
    children: [
      {
        path: 'create',
        loadComponent: () =>
          import('./features/categories/pages/categories-create-page/categories-create-page').then(
            m => m.CategoriesCreatePage
          )
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./features/categories/pages/categories-edit-page/categories-edit-page').then(
            m => m.CategoriesEditPage
          )
      }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
