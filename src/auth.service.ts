import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface LoginResponse {
	access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	private http = inject(HttpClient);
	private router = inject(Router);

	token = signal<string | null>(localStorage.getItem('jwt'));

	private apiUrl = 'http://10.174.167.213:5000/flask/login';

	login(username: string, password: string) {
		// return new Observable<LoginResponse>(s => s.next({ token: "token" }));
		return this.http.post<LoginResponse>(this.apiUrl, { username, password });
	}

	saveToken(token: string) {
		localStorage.setItem('jwt', token);
		this.token.set(token);
	}

	logout() {
		localStorage.removeItem('jwt');
		this.token.set(null);
		this.router.navigate(['/login']);
	}

	isLoggedIn() {
		return this.token() !== null;
	}
}
