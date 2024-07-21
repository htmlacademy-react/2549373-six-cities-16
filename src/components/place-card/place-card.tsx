import {JSX} from 'react';
import {capitalizeFirstLetter} from '../../functions';
import CardMarkPremium from '../card-mark-premium/card-mark-premium';
import {Offer} from '../../types/offers';
import classNames from 'classnames';
import FavoriteButton from '../favorite-button/favorite-button';
import {Nullable} from '../../types/globals';
import {Link} from 'react-router-dom';
import RatingView from '../rating-view/rating-view';
import {AppRoute} from '../../const.ts';

type Props = {
  offer: Offer;
  isCities: boolean;
  setCurrentOffer: (offer: Nullable<Offer>) => void;
}

function PlaceCard({offer, isCities, setCurrentOffer}: Props): JSX.Element {
  const {id, previewImage, price, type, title, isPremium, isFavorite, rating} = offer;
  const classesArticle = classNames(['place-card', {'cities__card': isCities}, {'favorites__card': !isCities}]);
  const classesImageWrapper = classNames(['place-card__image-wrapper', {'cities__image-wrapper': isCities}, {'favorites__image-wrapper': !isCities}]);

  function handlerMouseEnter() {
    setCurrentOffer(offer);
  }
  function handlerMouseLeave() {
    setCurrentOffer(null);
  }

  return (
    <article className={classesArticle} onMouseEnter={handlerMouseEnter} onMouseLeave={handlerMouseLeave}>
      {isPremium && <CardMarkPremium/>}
      <div className={classesImageWrapper}>
        <Link to={AppRoute.Offer.replace(':id', id)}>
          <img
            className="place-card__image"
            src={previewImage}
            width={isCities ? '260' : '150'}
            height={isCities ? '200' : '110'}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={classNames(['place-card__info', {'favorites__card-info': !isCities}])}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton isFavorite={isFavorite}/>
        </div>
        <RatingView rating={rating}/>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer.replace(':id', id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
