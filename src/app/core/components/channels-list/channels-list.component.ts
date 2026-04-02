import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatService } from '@app/shared/services/chat.service';

@Component({
  selector: 'app-channels-list',
  imports: [],
  templateUrl: './channels-list.component.html',
  styleUrl: './channels-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelsListComponent {
  protected chat = inject(ChatService);

  selectChannel(channelId: string) {
    this.chat.selectChannel(channelId);
  }
}
