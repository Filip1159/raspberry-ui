import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { AppComponent } from './components/app/app.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: '', component: AppComponent, canActivate: [authGuard] }
];
