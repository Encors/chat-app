export type UUID = string;

export interface User {
  id: UUID;
  username: string;
  password: string;
  is_online: boolean;
}

export type SafeUser = Omit<User, 'password'>;
