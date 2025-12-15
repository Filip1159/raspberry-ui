import { Routes } from '@angular/router'
import { Login } from './components/login/login'
import { AppComponent } from './components/app/app.component'
import { authGuard } from './auth.guard'
import { AlarmManagerComponent } from './components/alarm-manager/alarm-manager.component'

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'alarm', component: AlarmManagerComponent, canActivate: [authGuard] },
    { path: 'greet', component: AppComponent, canActivate: [authGuard] },
    { path: 'about-me', component: AppComponent, canActivate: [authGuard] },
    { path: '', component: AppComponent, canActivate: [authGuard] },
]
