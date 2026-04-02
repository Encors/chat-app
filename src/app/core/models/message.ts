import { SafeUser, UUID } from './user';

export interface Message {
  id: UUID;
  from_user: UUID;
  channel_id: UUID;
  content: string;
}

export interface MessageView extends Message {
  user?: SafeUser;
  isOwn?: boolean;
}
