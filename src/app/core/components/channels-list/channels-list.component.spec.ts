import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChannelsListComponent } from './channels-list.component';
import { ChatService } from '@app/shared/services/chat.service';
import { signal } from '@angular/core';

describe('ChannelsListComponent', () => {
  let component: ChannelsListComponent;
  let fixture: ComponentFixture<ChannelsListComponent>;
  let mockChatService: jasmine.SpyObj<ChatService>;

  beforeEach(async () => {
    mockChatService = jasmine.createSpyObj('ChatService', ['selectChannel', 'createChannel'], {
      userChannels: signal([]),
    });

    await TestBed.configureTestingModule({
      imports: [ChannelsListComponent],
      providers: [{ provide: ChatService, useValue: mockChatService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelsListComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should call chat.selectChannel with correct channelId when selectChannel is called', () => {
    const testChannelId = 'channel-123';

    component.selectChannel(testChannelId);

    expect(mockChatService.selectChannel).toHaveBeenCalledWith(testChannelId);
    expect(mockChatService.selectChannel).toHaveBeenCalledTimes(1);
  });
});
