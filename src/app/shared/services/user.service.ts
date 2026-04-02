import { inject, Injectable, signal } from '@angular/core';
import { SafeUser, UUID } from '@app/core/models/user';
import { ApiService } from '@app/shared/services/api.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiService = inject(ApiService);

  readonly users = signal<Map<UUID, SafeUser>>(new Map());

  getUser(id: UUID): SafeUser | undefined {
    return this.users().get(id);
  }

  loadUsers() {
    this.apiService.getUsers().subscribe(users => {
      const map = new Map(users.map(u => [u.id, u]));
      this.users.set(map);
    });
  }

  getCurrentUser(currentUserId: UUID): SafeUser | undefined {
    return currentUserId ? this.users().get(currentUserId) : undefined;
  }
}
