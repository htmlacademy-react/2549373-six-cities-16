export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export type UserData = {
  id: number;
} & Pick<User, 'email' | 'token'>;
