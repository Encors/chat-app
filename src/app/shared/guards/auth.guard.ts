import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@app/shared/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthService);
  const router = inject(Router);

  if (authStore.isAuthenticated()) {
    return true;
  }

  return router.parseUrl('/login');
};
