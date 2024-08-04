import { JSX, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { Nullable } from '../../types/globals';
import { OfferType } from '../../types/offers';
import { Cities, PageType, QUERY_PARAMETER } from '../../const';
import Tabs from '../../components/tabs/tabs';
import { CityName } from '../../types/city';
import { changeCity } from '../../store/action.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import SortingOptions from '../../components/sorting-options/sorting-options';
import useSortedCityOffers from '../../hooks/use-sorted-city-offers/use-sorted-city-offers.tsx';
import { State } from '../../types/state.ts';
import Header from '../../components/header/header.tsx';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const cityName = useAppSelector<CityName>((state: State) => state.cityName);
  const [searchParams] = useSearchParams();
  const slugParam: Nullable<string> = searchParams.get(QUERY_PARAMETER);
  const cityOffers = useSortedCityOffers(cityName);
  const [currentOffer, setCurrentOffer] = useState<Nullable<OfferType>>(null);

  useEffect(() => {
    if (slugParam && slugParam in Cities) {
      dispatch(changeCity(slugParam as CityName));
    } else {
      dispatch(changeCity(Cities.Paris));
    }
  }, [slugParam, dispatch]);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in {cityName}</b>
              <SortingOptions />
              <PlacesList offers={cityOffers} onChangeCurrentOffer={setCurrentOffer} className={PageType.CITIES} />
            </section>
            <div className="cities__right-section">
              {cityOffers.length > 0 &&
                <Map oneCityOffers={cityOffers} selectedOffer={currentOffer} className={PageType.CITIES} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
