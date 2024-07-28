import { JSX, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PlacesList from '../../components/places-list/places-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import { Nullable } from '../../types/globals';
import { OfferType } from '../../types/offers';
import { Cities, PageType, QUERY_PARAMETER } from '../../const';
import Tabs from '../../components/tabs/tabs';
import { CityName } from '../../types/city';
import { changeCity, setOffers } from '../../store/action.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { offers as offersMock } from '../../mocks/offers.ts';
import SortingOptions from '../../components/sorting-options/sorting-options';
import useSortedCityOffers from '../../hooks/use-sorted-city-offers/use-sorted-city-offers.tsx';
import {State} from '../../types/state.ts';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const cityName = useAppSelector<CityName>((state: State) => state.cityName);
  const [searchParams] = useSearchParams();
  const slugParam: Nullable<string> = searchParams.get(QUERY_PARAMETER);
  const cityOffers = useSortedCityOffers(cityName);
  const [currentOffer, setCurrentOffer] = useState<Nullable<OfferType>>(null);

  useEffect(() => {
    dispatch(setOffers(offersMock));
  }, [dispatch]);

  useEffect(() => {
    if (slugParam && slugParam in Cities) {
      dispatch(changeCity(slugParam as CityName));
    } else {
      dispatch(changeCity(Cities.Paris));
    }
  }, [slugParam, dispatch]);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo width="81" height="41" />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
              {cityOffers.length > 0 && <Map oneCityOffers={cityOffers} selectedOffer={currentOffer} className={PageType.CITIES} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
