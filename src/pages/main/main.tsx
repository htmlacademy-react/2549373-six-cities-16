import { JSX, useState } from 'react';
import classNames from 'classnames';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { Nullable } from '../../types/globals';
import { OfferType } from '../../types/offers';
import { PageType } from '../../const';
import Tabs from '../../components/tabs/tabs';
import { useAppSelector } from '../../hooks';
import SortingOptions from '../../components/sorting-options/sorting-options';
import useSortedCityOffers from '../../hooks/use-sorted-city-offers/use-sorted-city-offers.tsx';
import Header from '../../components/header/header.tsx';
import PageTitle from '../../components/page-title/page-title.tsx';
import NotFound from '../not-found/not-found';
import { useCityNavigation } from '../../hooks/use-city-navigation/use-city-navigation.ts';
import { getCityName } from '../../store/selectors/offers/offers.ts';

function Main(): JSX.Element {
  const { isCityValid } = useCityNavigation();
  const cityName = useAppSelector(getCityName);
  const cityOffers = useSortedCityOffers(cityName);
  const [currentOffer, setCurrentOffer] = useState<Nullable<OfferType>>(null);

  if (!isCityValid) {
    return <NotFound />;
  }

  const isEmpty = cityOffers.length === 0;

  return (
    <div className={classNames('page', 'page--gray', 'page--main')}>
      <PageTitle title="6 cities" />
      <Header />
      <main className={classNames('page__main', 'page__main--index', { 'page__main--index-empty': isEmpty })}>
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <div className="cities">
          <div className={classNames('cities__places-container', 'container', { 'cities__places-container--empty': isEmpty })}>
            {isEmpty ? (
              <>
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">
                      We could not find any property available at the moment in {cityName}
                    </p>
                  </div>
                </section>
                <div className="cities__right-section"></div>
              </>
            ) : (
              <>
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{cityOffers.length} places to stay in {cityName}</b>
                  <SortingOptions />
                  <PlacesList offers={cityOffers} onChangeCurrentOffer={setCurrentOffer} className={PageType.CITIES} />
                </section>
                <div className="cities__right-section">
                  {cityOffers.length > 0 && (
                    <Map oneCityOffers={cityOffers} selectedOffer={currentOffer} className={PageType.CITIES} />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
