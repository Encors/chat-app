import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatService } from '@app/shared/services/chat.service';

@Component({
  selector: 'app-users-list',
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  protected chat = inject(ChatService);
}
