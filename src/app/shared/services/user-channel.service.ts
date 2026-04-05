import { computed, inject, Injectable, signal } from '@angular/core';
import { UserChannel } from '@app/core/models/user-channel';
import { SafeUser, UUID } from '@app/core/models/user';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class UserChannelService {
  private apiService = inject(ApiService);
  private userChannelsRelations = signal<UserChannel[]>([]);
  readonly userChannels = computed(() => this.userChannelsRelations());

  loadUserChannels(): Observable<UserChannel[]> {
    return this.apiService.getUserChannels().pipe(tap(relations => this.userChannelsRelations.set(relations)));
  }

  getChannelUsers(channelId: UUID, allUsers: Map<UUID, SafeUser>): SafeUser[] {
    const relations = this.userChannelsRelations();
    const uniqueIds = new Set(relations.filter(uc => uc.channel_id === channelId).map(uc => uc.user_id));

    return [...uniqueIds].map(id => allUsers.get(id)).filter((user): user is SafeUser => !!user);
  }

  isUserInChannel(channelId: string, userId: UUID): boolean {
    if (!userId) return false;

    return this.userChannelsRelations().some(uc => uc.user_id === userId && uc.channel_id === channelId);
  }

  addUserToChannel$(userId: string, channelId: string): Observable<UserChannel> {
    return this.apiService.addUserToChannel({ user_id: userId, channel_id: channelId }).pipe(
      tap(userChannel => {
        this.userChannelsRelations.update(list => {
          const exists = list.some(
            uc => uc.user_id === userChannel.user_id && uc.channel_id === userChannel.channel_id,
          );

          return exists ? [...list] : [...list, userChannel];
        });
      }),
    );
  }
}
