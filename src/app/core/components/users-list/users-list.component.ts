import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ChatService } from '@app/shared/services/chat.service';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { PrimeTemplate } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-users-list',
  imports: [FormsModule, Dialog, PrimeTemplate, ButtonDirective, Select],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  protected chat = inject(ChatService);
  showAddUserModal = false;
  selectedUserId = '';
  readonly availableUsers = computed(() => {
    const allUsers = this.chat.allUsers();
    const currentChannelUsers = this.chat.activeChannelUsers();

    const currentIds = new Set(currentChannelUsers.map(u => u.id));

    return [...allUsers.values()].filter(user => !currentIds.has(user.id));
  });

  openAddUserModal() {
    if (!this.chat.activeChannel()) {
      alert('Please select a channel first');
      return;
    }
    this.showAddUserModal = true;
    this.selectedUserId = '';
  }

  closeModals() {
    this.showAddUserModal = false;
    this.selectedUserId = '';
  }

  addUserToChannel() {
    this.chat.addUserToChannel(this.selectedUserId, this.chat.activeChannelId());
    this.closeModals();
  }
}
