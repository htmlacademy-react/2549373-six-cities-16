import { JSX, useEffect } from 'react';
import CommentForm from '../../components/comment-form/comment-form';
import ReviewsList from '../../components/reviews-list/reviews-list.tsx';
import Map from '../../components/map/map.tsx';
import PlacesList from '../../components/places-list/places-list.tsx';
import { FullOffer, Offers, OfferType } from '../../types/offers.ts';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthStatus, PageType } from '../../const.ts';
import Header from '../../components/header/header.tsx';
import { addCommentAction, fetchOfferAction } from '../../store/api-actions.ts';
import { authorizationStatusSelector, getDataOffer } from '../../store/selectors.ts';
import { Nullable } from '../../types/globals.ts';
import FavoriteButton from '../../components/favorite-button/favorite-button.tsx';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.tsx';
import { Comment } from '../../types/reviews.ts';

const getNearbyOffers = (current: Nullable<FullOffer>, nearby: Nullable<Offers>): Offers => {
  if (!current || !nearby) {
    return [];
  }

  return nearby.filter((otherOffer: OfferType) => otherOffer.id !== current.id).slice(0, 3);
};

function Offer(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [currentOffer, nearbyOffers, reviews] = useAppSelector(getDataOffer);
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(authorizationStatusSelector);

  useEffect(() => {
    if (id && (!currentOffer || currentOffer?.id !== id)) {
      dispatch(fetchOfferAction(id));
    }
  }, [dispatch, id, currentOffer]);

  if (!currentOffer) {
    return <LoadingSpinner />;
  }

  const nearby = nearbyOffers ? getNearbyOffers(currentOffer, nearbyOffers) : [];
  const mapOffers = currentOffer ? [currentOffer, ...nearby] : [];

  const {
    title,
    type,
    price,
    isFavorite,
    isPremium,
    rating,
    description,
    bedrooms,
    goods,
    host,
    images,
    maxAdults
  } = currentOffer;

  const descriptionParagraphs = description.split(';');

  function handleToggleFavorite(favorite: boolean) {
    // eslint-disable-next-line no-console
    console.log('Offer: Значение isFavorite изменилось', favorite);
  }

  function handleSubmitCommentForm(dataComment: Comment) {
    if (!id) {
      return;
    }
    dispatch(addCommentAction({ id, dataComment }));
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images && images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && <div className="offer__mark"><span>Premium</span></div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <FavoriteButton isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} pageType={PageType.OFFER} />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods && goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  <span className="offer__user-status">
                    {host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  {descriptionParagraphs.map((paragraph) => (
                    <p className="offer__text" key={paragraph}>
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
              <section className="offer__reviews reviews">
                {reviews && <ReviewsList reviews={reviews} />}
                {authorizationStatus === AuthStatus.Auth && <CommentForm onSubmitCommentForm={handleSubmitCommentForm}/>}
              </section>
            </div>
          </div>
          {mapOffers.length > 0 &&
            <Map oneCityOffers={mapOffers} selectedOffer={currentOffer} className={PageType.OFFER} />}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList offers={nearby} className={PageType.NEAR_PLACES} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
