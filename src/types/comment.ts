import {User} from './user';

export type Comment = {
  id: string;
  date: string;
  user: Omit<User, 'email' | 'token'>;
  comment: string;
  rating: number;
}

export type Comments = Comment[];
