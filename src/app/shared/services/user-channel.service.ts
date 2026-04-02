import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '@app/shared/services/api.service';
import { UserChannel } from '@app/core/models/user-channel';
import { Channel } from '@app/core/models/channel';
import { SafeUser, UUID } from '@app/core/models/user';

@Injectable({ providedIn: 'root' })
export class UserChannelService {
  private apiService = inject(ApiService);

  private userChannelsRelations = signal<UserChannel[]>([]);

  getUserChannels(allChannels: Channel[], currentUserId: UUID): Channel[] {
    if (!currentUserId) return [];

    const relations = this.userChannelsRelations();
    const userChannelIds = relations.filter(uc => uc.user_id === currentUserId).map(uc => uc.channel_id);

    return allChannels.filter(channel => userChannelIds.includes(channel.id));
  }

  loadUserChannels() {
    this.apiService.getUserChannels().subscribe({
      next: relations => {
        this.userChannelsRelations.set(relations);
      },
    });
  }

  getChannelUsers(channelId: UUID, allUsers: Map<UUID, SafeUser>): SafeUser[] {
    const relations = this.userChannelsRelations();

    const userIds = relations.filter(uc => uc.channel_id === channelId).map(uc => uc.user_id);

    return userIds.map(id => allUsers.get(id)).filter((user): user is SafeUser => user !== undefined);
  }

  isUserInChannel(channelId: string, currentUserId: UUID): boolean {
    if (!currentUserId) return false;

    return this.userChannelsRelations().some(uc => uc.user_id === currentUserId && uc.channel_id === channelId);
  }
}
