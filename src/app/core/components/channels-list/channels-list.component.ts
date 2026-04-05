import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatService } from '@app/shared/services/chat.service';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { PrimeTemplate } from 'primeng/api';

@Component({
  selector: 'app-channels-list',
  imports: [FormsModule, Dialog, ButtonDirective, InputText, PrimeTemplate],
  templateUrl: './channels-list.component.html',
  styleUrl: './channels-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelsListComponent {
  protected chat = inject(ChatService);
  selectedUserId = '';

  selectChannel(channelId: string) {
    this.chat.selectChannel(channelId);
  }

  showAddChannelModal = false;
  newChannelName = '';

  openAddChannelModal() {
    this.showAddChannelModal = true;
    this.newChannelName = '';
  }

  closeModals() {
    this.showAddChannelModal = false;
    this.newChannelName = '';
    this.selectedUserId = '';
  }

  createChannel() {
    this.chat.createChannel(this.newChannelName.trim());
    this.closeModals();
  }
}
