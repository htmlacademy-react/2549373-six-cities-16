import {JSX} from 'react';

type RatingProps = {
  rating: number;
}

function Rating({rating}: RatingProps): JSX.Element {
  const computedRating = `${rating * 20}%`;
  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{width: computedRating}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}

export default Rating;
