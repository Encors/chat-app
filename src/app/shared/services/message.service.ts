import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Message, MessageView } from '@app/core/models/message';
import { SafeUser, UUID } from '@app/core/models/user';
import { ApiService } from '@app/shared/services/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private readonly apiService = inject(ApiService);

  readonly messages = signal<Map<UUID, Message[]>>(new Map());
  readonly loading = signal(false);
  protected destroyRef = inject(DestroyRef);
  getMessages(channelId: string): Message[] {
    return this.messages().get(channelId) || [];
  }

  getMessagesView(channelId: string, usersMap: Map<UUID, SafeUser>, currentUserId: UUID): MessageView[] {
    const messages = this.getMessages(channelId);

    return messages.map(msg => ({
      ...msg,
      user: usersMap.get(msg.from_user),
      isOwn: msg.from_user === currentUserId,
    }));
  }

  loadMessages(channelId: UUID) {
    this.loading.set(true);
    this.apiService
      .getMessages(channelId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: messages => {
          this.messages.update(map => {
            const newMap = new Map(map);
            newMap.set(channelId, messages);
            return newMap;
          });
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  sendMessage(content: string, channelId: UUID, userId: UUID) {
    this.apiService
      .sendMessage({
        from_user: userId,
        channel_id: channelId,
        content,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(newMessage => {
        this.messages.update(map => {
          const newMap = new Map(map);
          const current = newMap.get(channelId) || [];
          newMap.set(channelId, [...current, newMessage]);
          return newMap;
        });
      });
  }
}
