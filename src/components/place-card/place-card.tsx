import { JSX } from 'react';
import { capitalizeFirstLetter } from '../../functions';
import CardMarkPremium from '../card-mark-premium/card-mark-premium';
import { OfferType } from '../../types/offers';
import classNames from 'classnames';
import FavoriteButton from '../favorite-button/favorite-button';
import { Nullable } from '../../types/globals';
import { Link } from 'react-router-dom';
import RatingView from '../rating-view/rating-view';
import { AppRoute, PageType, } from '../../const.ts';

type Props = {
  offer: OfferType;
  onCurrentOfferChange: (offer: Nullable<OfferType>) => void;
  className: string;
}

function PlaceCard({ offer, onCurrentOfferChange, className }: Props): JSX.Element {
  const { id, previewImage, price, type, title, isPremium, isFavorite, rating } = offer;
  const isFavorites: boolean = className === PageType.FAVORITES;
  const classesArticle = classNames(['place-card', {
    'cities__card': className === PageType.CITIES,
    'near-places__card': className === PageType.NEAR_PLACES,
    'favorites__card': isFavorites,
  }]);
  const classesImageWrapper = classNames(['place-card__image-wrapper', {
    'cities__image-wrapper': className === PageType.CITIES,
    'near-places__image-wrapper': className === PageType.NEAR_PLACES,
    'favorites__image-wrapper': isFavorites,
  }]);

  function handlerMouseEnter() {
    onCurrentOfferChange(offer);
  }

  function handlerMouseLeave() {
    onCurrentOfferChange(null);
  }

  function changeFavorite(favarite: boolean) {
    // eslint-disable-next-line no-console
    console.log('Значение isFavfrinte изменилось', favarite);
  }

  return (
    <article className={classesArticle} onMouseEnter={handlerMouseEnter} onMouseLeave={handlerMouseLeave}>
      {isPremium && <CardMarkPremium/>}
      <div className={classesImageWrapper}>
        <Link to={AppRoute.Offer.replace(':id', id)}>
          <img
            className="place-card__image"
            src={previewImage}
            width={!isFavorites ? '260' : '150'}
            height={!isFavorites ? '200' : '110'}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={classNames(['place-card__info', { 'favorites__card-info': isFavorites }])}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton isFavorite={isFavorite} onToggleFavorite={changeFavorite}/>
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
