import { Routes } from '@angular/router';
import { authGuard } from '@app/shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@app/core/components/login/login.component'),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('@app/core/components/chat-area/chat-area.component'),
  },
  {
    path: 'user',
    canActivate: [authGuard],
    loadComponent: () => import('@app/core/components/user-page/user-page.component'),
  },
];
