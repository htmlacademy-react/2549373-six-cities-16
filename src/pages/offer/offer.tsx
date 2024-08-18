import { JSX, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { NOT_FOUND_ERROR, RequestStatus } from '../../const';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import NotFound from '../not-found/not-found';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import OfferGallery from '../../components/offer-gallery/offer-gallery.tsx';
import OfferContent from '../../components/offer-content/offer-content.tsx';
import NearbyPlaces from '../../components/nearby-places/nearby-places.tsx';
import PageTitle from '../../components/page-title/page-title.tsx';
import { getDataOffer, getNearbyPlacesData } from '../../store/selectors/offer/offer.ts';
import { setCurrentOffer } from '../../store/slices/offers/offers.ts';
import { fetchOfferAction } from '../../store/async-thunk/offer/offer.ts';

function Offer(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { offer, requestStatus, errorMessage, comments } = useAppSelector(getDataOffer);
  const nearby = useAppSelector(getNearbyPlacesData);

  useEffect(() => {
    dispatch(setCurrentOffer(offer));
    return () => {
      dispatch(setCurrentOffer(null));
    };
  }, [offer, dispatch]);

  useEffect(() => {
    if (
      id &&
      requestStatus !== RequestStatus.Loading &&
      requestStatus !== RequestStatus.Failed &&
      (!offer || offer.id !== id)
    ) {
      dispatch(fetchOfferAction(id));
    }
  }, [dispatch, id, offer, requestStatus]);

  if (requestStatus === RequestStatus.Failed && errorMessage === NOT_FOUND_ERROR) {
    return <NotFound/>;
  }

  if (requestStatus === RequestStatus.Loading || !offer) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="page">
      <PageTitle title="6 cities: offer"/>
      <Header/>
      <main className="page__main page__main--offer" data-testid='offer'>
        <section className="offer">
          <OfferGallery images={offer.images}/>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && <div className="offer__mark"><span>Premium</span></div>}
              <OfferContent
                offer={offer}
                reviews={comments}
              />
            </div>
          </div>
          {nearby.length > 0 && <Map oneCityOffers={[offer, ...nearby]} className="offer"/>}
        </section>
        <NearbyPlaces nearby={nearby}/>
      </main>
    </div>
  );
}

export default Offer;
