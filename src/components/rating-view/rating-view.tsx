import { JSX } from 'react';

type RatingViewProps = {
  rating: number;
}

function RatingView({ rating }: RatingViewProps): JSX.Element {
  const computedRating: string = `${Math.round(rating) * 20}%`;
  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{ width: computedRating }} data-testid="stars"></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}

export default RatingView;
