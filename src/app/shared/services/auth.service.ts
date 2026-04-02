import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SafeUser } from '@app/core/models/user';
import { ApiService } from '@app/shared/services/api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiService = inject(ApiService);
  private router = inject(Router);

  readonly user = signal<SafeUser | null>(null);
  readonly token = signal<string | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly isAuthenticated = computed(() => !!this.token());

  init() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        this.token.set(token);
        this.user.set(JSON.parse(user));
      } catch (e) {
        console.error('Failed to restore session', e);
      }
    }
  }

  login(username: string, password: string) {
    this.loading.set(true);
    this.error.set(null);

    this.apiService
      .login(username, password)
      .pipe(
        tap(({ user, token }) => {
          this.user.set(user);
          this.token.set(token || '');
          this.loading.set(false);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token || '');
          void this.router.navigate(['/']);
        }),
        catchError(err => {
          this.error.set(err.message || 'Ошибка входа');
          this.loading.set(false);
          return of(null);
        }),
      )
      .subscribe();
  }

  logout() {
    this.user.set(null);
    this.token.set(null);
    this.loading.set(false);
    this.error.set(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    void this.router.navigate(['/login']);
  }
}
