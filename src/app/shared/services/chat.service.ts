import { computed, inject, Injectable } from '@angular/core';
import { ChannelService } from '@app/shared/services/channel.service';
import { MessageService } from '@app/shared/services/message.service';
import { UserChannelService } from '@app/shared/services/user-channel.service';
import { UserService } from '@app/shared/services/user.service';
import { AuthService } from '@app/shared/services/auth.service';
import { MessageView } from '@app/core/models/message';
import { Channel } from '@app/core/models/channel';
import { SafeUser } from '@app/core/models/user';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly channelService = inject(ChannelService);
  private readonly messageService = inject(MessageService);
  private readonly userChannelService = inject(UserChannelService);
  private readonly userService = inject(UserService);
  private auth = inject(AuthService);
  readonly currentUserId = computed(() => this.auth.user()?.id || '');

  readonly userChannels = computed((): Channel[] => {
    const allChannels = this.channelService.channels();
    const userId = this.currentUserId();
    return this.userChannelService.getUserChannels(allChannels, userId);
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

  init(): void {
    this.loadChannels();
    this.loadUsers();
    this.loadUserChannels();
  }

  readonly channels = this.channelService.channels;
  readonly activeChannelId = this.channelService.activeChannelId;
  readonly activeChannel = this.channelService.activeChannel;
  readonly loadingMessages = this.messageService.loading;
  readonly loadingChannels = this.channelService.loading;

  loadChannels() {
    this.channelService.loadChannels();
  }

  loadUsers() {
    this.userService.loadUsers();
  }

  loadUserChannels() {
    this.userChannelService.loadUserChannels();
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
}
