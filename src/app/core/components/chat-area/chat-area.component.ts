import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ChatService } from '@app/shared/services/chat.service';
import { ChannelsListComponent } from '@app/core/components/channels-list/channels-list.component';
import { MessagesListComponent } from '@app/core/components/messages-list/messages-list.component';
import { MessageInputComponent } from '@app/core/components/message-input/message-input.component';
import { UsersListComponent } from '@app/core/components/users-list/users-list.component';
import { HeaderComponent } from '@app/core/components/header/header.component';

@Component({
  selector: 'app-chat-area',
  imports: [ChannelsListComponent, MessagesListComponent, MessageInputComponent, UsersListComponent, HeaderComponent],
  templateUrl: './chat-area.component.html',
  styleUrl: './chat-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChatAreaComponent implements OnInit {
  protected chatService = inject(ChatService);

  ngOnInit(): void {
    this.chatService.init();
  }
}
