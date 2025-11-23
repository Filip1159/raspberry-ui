import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { AppComponent } from './components/app/app.component';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: '', component: AppComponent }
];
