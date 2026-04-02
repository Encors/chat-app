import { User } from '@app/core/models/user';
import { Channel } from '@app/core/models/channel';
import { Message } from '@app/core/models/message';
import { UserChannel } from '@app/core/models/user-channel';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'Maria',
    password: 'password123',
    is_online: true,
  },
  {
    id: '2',
    username: 'Max',
    password: 'password123',
    is_online: true,
  },
  {
    id: '3',
    username: 'Andrew',
    password: 'password123',
    is_online: false,
  },
  {
    id: '4',
    username: 'Anton',
    password: 'password123',
    is_online: true,
  },
];

export const MOCK_CHANNELS: Channel[] = [
  { id: '1', name: 'general' },
  { id: '2', name: 'summer' },
  { id: '3', name: 'party' },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    from_user: '1',
    channel_id: '1',
    content: `hey
    how are you?`,
  },
  {
    id: '2',
    from_user: '2',
    channel_id: '1',
    content: 'Hi, im work :(',
  },
];

export const MOCK_USER_CHANNELS: UserChannel[] = [
  {
    user_id: '4',
    channel_id: '1',
  },
  {
    user_id: '4',
    channel_id: '2',
  },
  {
    user_id: '4',
    channel_id: '3',
  },
  {
    user_id: '2',
    channel_id: '1',
  },
  {
    user_id: '2',
    channel_id: '2',
  },
  {
    user_id: '3',
    channel_id: '1',
  },
  {
    user_id: '1',
    channel_id: '1',
  },
];
