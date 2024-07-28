import {JSX, useEffect} from 'react';
import Logo from '../../components/logo/logo';
import {Offers, OfferType} from '../../types/offers';
import FavoritesList from '../../components/favorites-list/favorites-list';
import {groupBy} from '../../functions';
import {setOffers} from '../../store/action.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {offers as offersMock} from '../../mocks/offers.ts';


function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers);

  useEffect(() => {
    dispatch(setOffers(offersMock));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const favoriteOffers: Offers = offers.filter((offer: OfferType) => offer.isFavorite);
  const favoriteOffersByGroup: Record<string, Offers> = groupBy(favoriteOffers, (offer: OfferType) => offer.city.name);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo width="81" height="41"/>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
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
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList favoriteOffersByGroup={favoriteOffersByGroup}/>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Logo width="64" height="33"/>
      </footer>
    </div>
  );
}

export default Favorites;
