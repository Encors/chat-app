import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/shared/services/auth.service';

@Component({
  selector: 'app-user-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserPageComponent {
  protected authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
