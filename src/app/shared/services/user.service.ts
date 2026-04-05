import { inject, Injectable, signal } from '@angular/core';
import { SafeUser, UUID } from '@app/core/models/user';
import { ApiService } from '@app/shared/services/api.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiService = inject(ApiService);

  readonly users = signal<Map<UUID, SafeUser>>(new Map());

  loadUsers(): Observable<SafeUser[]> {
    return this.apiService.getUsers().pipe(
      tap(users => {
        this.users.set(new Map(users.map(u => [u.id, u])));
      }),
    );
  }

  getCurrentUser(currentUserId: UUID): SafeUser | undefined {
    return currentUserId ? this.users().get(currentUserId) : undefined;
  }
}
