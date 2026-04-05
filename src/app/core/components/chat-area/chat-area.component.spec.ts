import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import ChatAreaComponent from '@app/core/components/chat-area/chat-area.component';
import { ChatService } from '@app/shared/services/chat.service';
import { signal } from '@angular/core';

describe('ChatAreaComponent', () => {
  let component: ChatAreaComponent;
  let fixture: ComponentFixture<ChatAreaComponent>;
  let mockChatService: jasmine.SpyObj<ChatService>;

  beforeEach(async () => {
    const mockCurrentUserId = signal('');
    const mockUserChannels = signal([]);
    const mockActiveChannel = signal(null);

    mockChatService = jasmine.createSpyObj(
      'ChatService',
      ['init', 'selectChannel', 'sendMessage', 'createChannel', 'addUserToChannel'],
      {
        currentUserId: mockCurrentUserId,
        userChannels: mockUserChannels,
        activeChannel: mockActiveChannel,
      },
    );

    await TestBed.configureTestingModule({
      imports: [ChatAreaComponent],
      providers: [provideRouter([]), { provide: ChatService, useValue: mockChatService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatAreaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should call chatService.init on ngOnInit', () => {
    expect(mockChatService.init).toHaveBeenCalled();
    expect(mockChatService.init).toHaveBeenCalledTimes(1);
  });
});
