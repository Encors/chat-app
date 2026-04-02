import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { UserService } from '@app/shared/services/user.service';
import { UUID } from '@app/core/models/user';
import { AuthService } from '@app/shared/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly userService = inject(UserService);
  protected authService = inject(AuthService);

  readonly currentUserId = input.required<UUID>();

  readonly user = computed(() => this.userService.getCurrentUser(this.currentUserId()));

  onLogout() {
    this.authService.logout();
  }
}
