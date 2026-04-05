import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { AuthResponse } from '@app/core/models/auth';
import { SafeUser, UUID } from '@app/core/models/user';
import { Channel } from '@app/core/models/channel';
import { Message } from '@app/core/models/message';
import { MOCK_CHANNELS, MOCK_MESSAGES, MOCK_USER_CHANNELS, MOCK_USERS } from '@app/core/utils/mocks';
import { UserChannel } from '@app/core/models/user-channel';

@Injectable({ providedIn: 'root' })
export class ApiService {
  login(username: string, password: string): Observable<AuthResponse> {
    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    if (!user) {
      return throwError(() => new Error('Invalid username or password'));
    }
    const { password: _, ...safeUser } = user;
    return of({
      user: safeUser,
      token: btoa(`${username}:${Date.now()}`),
    }).pipe(delay(500));
  }

  getChannels(): Observable<Channel[]> {
    return of(MOCK_CHANNELS).pipe(delay(300));
  }

  createChannel(data: Omit<Channel, 'id'>): Observable<Channel> {
    const exists = MOCK_CHANNELS.some(c => c.name === data.name);
    if (exists) {
      return throwError(() => new Error('Channel already exists'));
    }

    const newChannel: Channel = {
      id: crypto.randomUUID() as UUID,
      name: data.name,
    };

    MOCK_CHANNELS.push(newChannel);
    return of(newChannel).pipe(delay(300));
  }

  getMessages(channelId: UUID): Observable<Message[]> {
    const messages = MOCK_MESSAGES.filter(m => m.channel_id === channelId);
    return of(messages).pipe(delay(200));
  }

  sendMessage(message: Omit<Message, 'id'>): Observable<Message> {
    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID() as UUID,
    };

    MOCK_MESSAGES.push(newMessage);
    return of(newMessage).pipe(delay(100));
  }

  getUsers(): Observable<SafeUser[]> {
    const safeUsers = MOCK_USERS.map(({ password, ...user }) => user as SafeUser);
    return of(safeUsers).pipe(delay(200));
  }

  getUserChannels(userId?: UUID): Observable<UserChannel[]> {
    let result = MOCK_USER_CHANNELS;
    if (userId) {
      result = result.filter(uc => uc.user_id === userId);
    }
    return of(result).pipe(delay(200));
  }

  addUserToChannel(data: UserChannel): Observable<UserChannel> {
    const exists = MOCK_USER_CHANNELS.some(uc => uc.user_id === data.user_id && uc.channel_id === data.channel_id);

    if (exists) {
      return throwError(() => new Error('User already in channel'));
    }

    const newUserChannel: UserChannel = {
      user_id: data.user_id,
      channel_id: data.channel_id,
    };

    MOCK_USER_CHANNELS.push(newUserChannel);
    return of(newUserChannel).pipe(delay(200));
  }
}
