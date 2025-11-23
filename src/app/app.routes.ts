import { Routes } from '@angular/router';
import { Login } from './login/login';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: '', component: AppComponent }
];
