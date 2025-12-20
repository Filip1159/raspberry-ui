import { Injectable, signal, inject } from '@angular/core'
import { Router } from '@angular/router'
import { RaspberryApi } from './raspberry.api'

@Injectable({ providedIn: 'root' })
export class AuthService {
    private api = inject(RaspberryApi)
    private router = inject(Router)

    token = signal<string | null>(localStorage.getItem('jwt'))

    login(username: string, password: string) {
        return this.api.login(username, password)
    }

    saveToken(token: string) {
        localStorage.setItem('jwt', token)
        this.token.set(token)
    }

    logout() {
        localStorage.removeItem('jwt')
        this.token.set(null)
        this.router.navigate(['/login'])
    }

    isLoggedIn() {
        return this.token() !== null
    }
}
