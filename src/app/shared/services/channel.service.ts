import { computed, inject, Injectable, signal } from '@angular/core';
import { Channel } from '@app/core/models/channel';
import { UUID } from '@app/core/models/user';
import { finalize, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ChannelService {
  private readonly apiService = inject(ApiService);
  readonly channels = signal<Channel[]>([]);
  readonly activeChannelId = signal<UUID>('');
  readonly loading = signal(false);
  readonly activeChannel = computed(() => this.channels().find(c => c.id === this.activeChannelId()));

  loadChannels(): Observable<Channel[]> {
    this.loading.set(true);

    return this.apiService.getChannels().pipe(
      tap({
        next: channels => this.channels.set(channels),
      }),
      finalize(() => this.loading.set(false)),
    );
  }

  selectChannel(id: UUID) {
    this.activeChannelId.set(id);
  }

  createChannel(name: string): Observable<Channel> {
    return this.apiService.createChannel({ name }).pipe(
      tap(channel => {
        this.channels.update(list => {
          const exists = list.some(c => c.id === channel.id);
          return exists ? [...list] : [...list, channel];
        });
      }),
    );
  }
}
