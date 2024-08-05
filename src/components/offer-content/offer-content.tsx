import { JSX } from 'react';
import { FullOffer } from '../../types/offers.ts';
import { AuthStatus } from '../../const.ts';
import { Comment, Reviews } from '../../types/reviews.ts';
import FavoriteButton from '../favorite-button/favorite-button.tsx';
import OfferHost from '../offer-host/offer-host.tsx';
import ReviewsList from '../reviews-list/reviews-list.tsx';
import CommentForm from '../comment-form/comment-form.tsx';

type OfferContentProps = {
  offer: FullOffer;
  authorizationStatus: AuthStatus;
  reviews: Reviews;
  onCommentSubmit: (dataComment: Comment) => void;
}

function OfferContent({ offer, authorizationStatus, reviews, onCommentSubmit }: OfferContentProps): JSX.Element {
  const {
    title,
    type,
    price,
    isFavorite,
    rating,
    description,
    bedrooms,
    goods,
    host,
    maxAdults
  } = offer;

  return (
    <>
      <div className="offer__name-wrapper">
        <h1 className="offer__name">{title}</h1>
        <FavoriteButton isFavorite={isFavorite} onToggleFavorite={() => {}} pageType="offer"/>
      </div>
      <div className="offer__rating rating">
        <div className="offer__stars rating__stars">
          <span style={{ width: `${rating * 20}%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="offer__rating-value rating__value">{rating}</span>
      </div>
      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">{type}</li>
        <li className="offer__feature offer__feature--bedrooms">{bedrooms} Bedrooms</li>
        <li className="offer__feature offer__feature--adults">Max {maxAdults} adults</li>
      </ul>
      <div className="offer__price">
        <b className="offer__price-value">&euro;{price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>
      <div className="offer__inside">
        <h2 className="offer__inside-title">What&apos;s inside</h2>
        <ul className="offer__inside-list">
          {goods.map((good) => (
            <li className="offer__inside-item" key={good}>{good}</li>
          ))}
        </ul>
      </div>
      <OfferHost host={host} description={description}/>
      <section className="offer__reviews reviews">
        {reviews && <ReviewsList reviews={reviews}/>}
        {authorizationStatus === AuthStatus.Auth && (
          <CommentForm onSubmitCommentForm={onCommentSubmit}/>
        )}
      </section>
    </>
  );
}

export default OfferContent;
