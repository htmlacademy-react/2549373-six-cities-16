import {JSX, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import PlacesList from '../../components/places-list/places-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import {groupBy} from '../../functions';
import {Nullable} from '../../types/globals';
import {Offer, Offers} from '../../types/offers';
import {Cities, QUERY_PARAMETER} from '../../const';
import Tabs from '../../components/tabs/tabs';
import {CityName} from '../../types/city';
import SortDropdown from '../../components/sort-dropdown/sort-dropdown.tsx';

type Props = {
  offers: Offers;
}

function Main({ offers }: Props): JSX.Element {
  const [searchParams] = useSearchParams();
  const slugParam: string | null = searchParams.get(QUERY_PARAMETER);
  const [cityName, setCityName] = useState<CityName>(
    (slugParam && slugParam in Cities ? slugParam : Cities.Paris) as CityName
  );
  const [cityOffers, setCityOffers] = useState<Offers>([]);

  useEffect(() => {
    if (slugParam && slugParam in Cities) {
      setCityName(slugParam as CityName);
    } else {
      setCityName(Cities.Paris);
    }
  }, [slugParam]);

  useEffect(() => {
    const offersByGroup: Record<string, Offer[]> = groupBy(offers, (offer: Offer) => offer.city.name);
    setCityOffers(offersByGroup[cityName]?.slice(0, 5) || []);
  }, [cityName, offers]);

  const [currentOffer, setCurrentOffer] = useState<Nullable<Offer>>(null);

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
              <SortDropdown />
              <PlacesList offers={cityOffers} changeCurrentOffer={setCurrentOffer} />
            </section>
            <div className="cities__right-section">
              {cityOffers.length > 0 && <Map oneCityOffers={cityOffers} selectedOffer={currentOffer} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
