import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesListComponent } from './messages-list.component';
import { ChatService } from '@app/shared/services/chat.service';
import { signal } from '@angular/core';

describe('MessagesListComponent', () => {
  let component: MessagesListComponent;
  let fixture: ComponentFixture<MessagesListComponent>;
  let mockChatService: jasmine.SpyObj<ChatService>;

  beforeEach(async () => {
    mockChatService = jasmine.createSpyObj('ChatService', ['sendMessage'], {
      messagesView: signal([
        { id: '1', content: 'Hello', user_id: '1', username: 'Current User' },
        { id: '2', content: 'Hi there', user_id: '2', username: 'Other User' },
      ]),
      loadingMessages: signal(false),
    });

    await TestBed.configureTestingModule({
      imports: [MessagesListComponent],
      providers: [{ provide: ChatService, useValue: mockChatService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesListComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have access to chatService messagesView', () => {
    const messagesView = component.chatService.messagesView();
    expect(messagesView).toBeDefined();
    expect(Array.isArray(messagesView)).toBeTrue();
  });
});
