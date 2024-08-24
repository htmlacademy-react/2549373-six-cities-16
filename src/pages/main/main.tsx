import { JSX } from 'react';
import classNames from 'classnames';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { PageType } from '../../const';
import Tabs from '../../components/tabs/tabs';
import { useAppSelector } from '../../hooks';
import SortingOptions from '../../components/sorting-options/sorting-options';
import useSortedCityOffers from '../../hooks/use-sorted-city-offers/use-sorted-city-offers';
import Header from '../../components/header/header';
import PageTitle from '../../components/page-title/page-title';
import NotFound from '../not-found/not-found';
import { useCityNavigation } from '../../hooks/use-city-navigation/use-city-navigation';
import { getCityName } from '../../store/selectors/offers/offers';
import { pluralize } from '../../utils/utils.ts';

function Main(): JSX.Element {
  const { isCityValid } = useCityNavigation();
  const cityName = useAppSelector(getCityName);
  const cityOffers = useSortedCityOffers(cityName);

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
                <section className="cities__no-places" data-testid="no-places">
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
                  <b className="places__found" data-testid="places-found">{cityOffers.length} place{pluralize(cityOffers.length)} to stay in {cityName}</b>
                  <SortingOptions />
                  <PlacesList offers={cityOffers} className={PageType.CITIES} />
                </section>
                <div className="cities__right-section">
                  {cityOffers.length > 0 && (
                    <Map oneCityOffers={cityOffers} className={PageType.CITIES} />
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
