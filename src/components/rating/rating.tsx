import React, {ChangeEvent, JSX} from 'react';
import {RatingTooltip} from '../../types/rating.ts';

type RatingProps = {
  rating: number | null;
  onChange: (rating: number) => void;
};

function Rating({rating, onChange}: RatingProps): JSX.Element {
  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  function getTitle(starNumber: number): RatingTooltip {
    switch (starNumber) {
      case 1:
        return 'terribly';
      case 2:
        return 'badly';
      case 3:
        return 'not bad';
      case 4:
        return 'good';
      case 5:
        return 'perfect';
      default:
        throw new Error(`Unexpected star number: ${starNumber}`);
    }
  }

  return (
    <div className="reviews__rating-form form__rating">
      {[5, 4, 3, 2, 1].map((starNumber: number) => (
        <React.Fragment key={starNumber}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={starNumber}
            id={`${starNumber}-stars`}
            type="radio"
            checked={rating === starNumber}
            onChange={handleRatingChange}
          />
          <label
            htmlFor={`${starNumber}-stars`}
            className="reviews__rating-label form__rating-label"
            title={getTitle(starNumber)}
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Rating;
