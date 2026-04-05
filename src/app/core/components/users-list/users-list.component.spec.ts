import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { ChatService } from '@app/shared/services/chat.service';
import { signal } from '@angular/core';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let mockChatService: jasmine.SpyObj<ChatService>;

  beforeEach(async () => {
    const mockAllUsers = signal(
      new Map([
        ['1', { id: '1', username: 'User 1', is_online: true }],
        ['2', { id: '2', username: 'User 2', is_online: false }],
        ['3', { id: '3', username: 'User 3', is_online: true }],
      ]),
    );

    const mockActiveChannelUsers = signal([{ id: '1', username: 'User 1', is_online: true }]);
    const mockActiveChannel = signal({ id: '1', name: 'General' });
    const mockActiveChannelId = signal('1');

    mockChatService = jasmine.createSpyObj(
      'ChatService',
      ['addUserToChannel', 'selectChannel', 'sendMessage', 'createChannel', 'init'],
      {
        allUsers: mockAllUsers,
        activeChannelUsers: mockActiveChannelUsers,
        activeChannel: mockActiveChannel,
        activeChannelId: mockActiveChannelId,
      },
    );

    await TestBed.configureTestingModule({
      imports: [UsersListComponent],
      providers: [{ provide: ChatService, useValue: mockChatService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should call chat.addUserToChannel with correct parameters when addUserToChannel is called', () => {
    const testUserId = '2';
    const testChannelId = '1';

    component.selectedUserId = testUserId;
    component.addUserToChannel();

    expect(mockChatService.addUserToChannel).toHaveBeenCalledWith(testUserId, testChannelId);
    expect(mockChatService.addUserToChannel).toHaveBeenCalledTimes(1);
  });

  it('should close modals and clear selectedUserId after adding user', () => {
    component.selectedUserId = '2';
    component.showAddUserModal = true;

    component.addUserToChannel();

    expect(component.showAddUserModal).toBeFalse();
    expect(component.selectedUserId).toBe('');
  });

  it('should open add user modal and clear selectedUserId when openAddUserModal is called with active channel', () => {
    component.openAddUserModal();

    expect(component.showAddUserModal).toBeTrue();
    expect(component.selectedUserId).toBe('');
  });

  it('should compute available users correctly', () => {
    const availableUsers = component.availableUsers();

    expect(availableUsers.length).toBe(2);
    expect(availableUsers.some(u => u.id === '2')).toBeTrue();
    expect(availableUsers.some(u => u.id === '3')).toBeTrue();
    expect(availableUsers.some(u => u.id === '1')).toBeFalse();
  });
});
