import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatService } from '@app/shared/services/chat.service';

@Component({
  selector: 'app-messages-list',
  imports: [],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  protected chat = inject(ChatService);
}
