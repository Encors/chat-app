import { SafeUser } from './user';

export interface AuthResponse {
  user: SafeUser;
  token?: string;
}
