import {JSX} from 'react';
import {Offer} from '../../mocks/offers';
import {capitalizeFirstLetter} from '../../functions';
import Rating from '../rating/rating';
import CardMarkPremium from '../card-mark-premium/card-mark-premium';
import Favorite from '../favorite/favorite';

type Props = {
  offer: Offer;
}

function PlaceCard({offer}: Props): JSX.Element {
  const {previewImage, price, type, title, isPremium, isFavorite, rating} = offer;

  return (
    <article className="cities__card place-card">
      {isPremium && <CardMarkPremium/>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Favorite isFavorite={isFavorite}/>
        </div>
        <Rating rating={rating}/>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
