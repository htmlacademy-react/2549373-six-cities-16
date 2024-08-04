import {User} from './user';

export type Review = {
  id: string;
  date: string;
  user: Omit<User, 'email' | 'token'>;
  comment: string;
  rating: number;
}

export type Comment = Pick<Review, 'comment' | 'rating'>

export type Reviews = Review[];
