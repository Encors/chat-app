import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageInputComponent } from './message-input.component';
import { ChatService } from '@app/shared/services/chat.service';

describe('MessageInputComponent', () => {
  let component: MessageInputComponent;
  let fixture: ComponentFixture<MessageInputComponent>;
  let mockChatService: jasmine.SpyObj<ChatService>;

  beforeEach(async () => {
    mockChatService = jasmine.createSpyObj('ChatService', ['sendMessage']);

    await TestBed.configureTestingModule({
      imports: [MessageInputComponent],
      providers: [{ provide: ChatService, useValue: mockChatService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageInputComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should call chatService.sendMessage with trimmed message when sendMessage is called with non-empty message', () => {
    const testMessage = 'Hello, world!';
    component.newMessage = testMessage;

    component.sendMessage();

    expect(mockChatService.sendMessage).toHaveBeenCalledWith(testMessage);
    expect(mockChatService.sendMessage).toHaveBeenCalledTimes(1);
    expect(component.newMessage).toBe('');
  });

  it('should not call chatService.sendMessage when newMessage is empty', () => {
    component.newMessage = '';

    component.sendMessage();

    expect(mockChatService.sendMessage).not.toHaveBeenCalled();
  });

  it('should not call chatService.sendMessage when newMessage is only whitespace', () => {
    component.newMessage = '   ';

    component.sendMessage();

    expect(mockChatService.sendMessage).not.toHaveBeenCalled();
  });
});
