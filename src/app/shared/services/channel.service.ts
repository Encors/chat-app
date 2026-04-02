import { computed, inject, Injectable, signal } from '@angular/core';
import { Channel } from '@app/core/models/channel';
import { UUID } from '@app/core/models/user';
import { ApiService } from '@app/shared/services/api.service';

@Injectable({ providedIn: 'root' })
export class ChannelService {
  private readonly apiService = inject(ApiService);

  readonly channels = signal<Channel[]>([]);
  readonly activeChannelId = signal<UUID>('');
  readonly loading = signal(false);
  readonly activeChannel = computed(() => this.channels().find(c => c.id === this.activeChannelId()));

  loadChannels() {
    this.loading.set(true);
    this.apiService.getChannels().subscribe({
      next: channels => {
        this.channels.set(channels);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  selectChannel(id: UUID) {
    this.activeChannelId.set(id);
  }

  createChannel(name: string) {
    this.apiService.createChannel({ name }).subscribe(channel => {
      this.channels.update(list => [...list, channel]);
    });
  }
}
