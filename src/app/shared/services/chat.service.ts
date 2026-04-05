import { computed, inject, Injectable } from '@angular/core';
import { ChannelService } from '@app/shared/services/channel.service';
import { MessageService } from '@app/shared/services/message.service';
import { UserChannelService } from '@app/shared/services/user-channel.service';
import { UserService } from '@app/shared/services/user.service';
import { AuthService } from '@app/shared/services/auth.service';
import { MessageView } from '@app/core/models/message';
import { Channel } from '@app/core/models/channel';
import { SafeUser } from '@app/core/models/user';
import { forkJoin, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly channelService = inject(ChannelService);
  private readonly messageService = inject(MessageService);
  private readonly userChannelService = inject(UserChannelService);
  private readonly userService = inject(UserService);
  private readonly auth = inject(AuthService);

  readonly currentUserId = computed(() => this.auth.user()?.id || '');
  readonly userChannels = computed((): Channel[] => {
    const allChannels = this.channelService.channels();
    const relations = this.userChannelService.userChannels();
    const userId = this.currentUserId();

    if (!userId) return [];

    const ids = new Set(relations.filter(uc => uc.user_id === userId).map(uc => uc.channel_id));

    return allChannels.filter(c => ids.has(c.id));
  });

  readonly messagesView = computed((): MessageView[] => {
    const channelId = this.channelService.activeChannelId();
    const userId = this.currentUserId();
    const usersMap = this.userService.users();

    if (!channelId || !userId) return [];

    return this.messageService.getMessagesView(channelId, usersMap, userId);
  });
  readonly activeChannelUsers = computed((): SafeUser[] => {
    const channelId = this.channelService.activeChannelId();
    const usersMap = this.userService.users();

    if (!channelId) return [];

    return this.userChannelService.getChannelUsers(channelId, usersMap);
  });
  readonly allUsers = this.userService.users;
  readonly activeChannelId = this.channelService.activeChannelId;
  readonly activeChannel = this.channelService.activeChannel;
  readonly loadingMessages = this.messageService.loading;

  init(): void {
    forkJoin({
      channels: this.channelService.loadChannels(),
      users: this.userService.loadUsers(),
      userChannels: this.userChannelService.loadUserChannels(),
    }).subscribe();
  }

  selectChannel(channelId: string) {
    const userId = this.currentUserId();

    if (!this.userChannelService.isUserInChannel(channelId, userId)) {
      console.warn('No access to channel');
      return;
    }

    this.channelService.selectChannel(channelId);
    this.messageService.loadMessages(channelId);
  }

  sendMessage(content: string) {
    const channelId = this.channelService.activeChannelId();
    const userId = this.currentUserId();

    if (channelId && userId && content.trim()) {
      this.messageService.sendMessage(content, channelId, userId);
    }
  }

  createChannel(name: string) {
    const userId = this.currentUserId();
    if (!userId) return;

    this.channelService
      .createChannel(name)
      .pipe(
        switchMap(channel => this.userChannelService.addUserToChannel$(userId, channel.id)),
        switchMap(() =>
          forkJoin({
            channels: this.channelService.loadChannels(),
            relations: this.userChannelService.loadUserChannels(),
          }),
        ),
      )
      .subscribe();
  }

  addUserToChannel(userId: string, channelId: string) {
    this.userChannelService.addUserToChannel$(userId, channelId).subscribe();
  }
}
