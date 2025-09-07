import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
//Зберігаємо логін та пароль користувача
  email: string = '';
  password: string = '';

  login() {
    console.log("Login user data", this.email, this.password);
  }
}
