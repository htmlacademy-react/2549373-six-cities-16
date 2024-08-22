import { JSX, useCallback } from 'react';
import { capitalizeFirstLetter } from '../../utils/utils';
import CardMarkPremium from '../card-mark-premium/card-mark-premium';
import { OfferType } from '../../types/offers';
import classNames from 'classnames';
import FavoriteButton from '../favorite-button/favorite-button';
import { Link, useNavigate } from 'react-router-dom';
import RatingView from '../rating-view/rating-view';
import { AppRoute, PageType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkIsAuth } from '../../store/selectors/auth/auth';
import { setCurrentOffer } from '../../store/slices/offers/offers';
import { toggleFavoriteStatusAction } from '../../store/async-thunk/favorites/favorites';

type Props = {
  offer: OfferType;
  className: string;
};

function PlaceCard({ offer, className }: Props): JSX.Element {
  const isAuth = useAppSelector(checkIsAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id, previewImage, price, type, title, isPremium, isFavorite, rating } = offer;
  const isFavorites: boolean = className === PageType.FAVORITES;
  const isNearPlaces = className === PageType.NEAR_PLACES;
  const isCities = className === PageType.CITIES;
  const classesArticle = classNames(['place-card', {
    'cities__card': className === PageType.CITIES,
    'near-places__card': isNearPlaces,
    'favorites__card': isFavorites,
  }]);
  const classesImageWrapper = classNames(['place-card__image-wrapper', {
    'cities__image-wrapper': className === PageType.CITIES,
    'near-places__image-wrapper': isNearPlaces,
    'favorites__image-wrapper': isFavorites,
  }]);

  function handlerMouseEnter() {
    if (!isCities) {
      return;
    }
    dispatch(setCurrentOffer(offer));
  }

  function handlerMouseLeave() {
    if (!isCities) {
      return;
    }
    dispatch(setCurrentOffer(null));
  }

  const handleToggleFavorite = useCallback((newFavoriteStatus: boolean) => {
    if (!isAuth) {
      navigate(AppRoute.Login, { replace: true });
      return;
    }
    dispatch(toggleFavoriteStatusAction({ id, status: Number(newFavoriteStatus) }));
  }, [id, isAuth, navigate, dispatch]);

  return (
    <article className={classesArticle} onMouseEnter={handlerMouseEnter} onMouseLeave={handlerMouseLeave}>
      {isPremium && <CardMarkPremium />}
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
          <FavoriteButton isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} />
        </div>
        <RatingView rating={rating} />
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer.replace(':id', id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
