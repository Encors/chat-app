import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatService } from '@app/shared/services/chat.service';
import { FormsModule } from '@angular/forms';
import { Textarea } from 'primeng/textarea';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-message-input',
  imports: [FormsModule, Textarea, ButtonDirective],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent {
  protected chatService = inject(ChatService);
  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}
