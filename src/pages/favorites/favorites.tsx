import { JSX } from 'react';
import Logo from '../../components/logo/logo';
import { Offers, OfferType } from '../../types/offers';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { groupBy } from '../../functions';
import { useAppSelector } from '../../hooks';
import Header from '../../components/header/header.tsx';

function Favorites(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);

  const favoriteOffers: Offers = offers.filter((offer: OfferType) => offer.isFavorite);
  const favoriteOffersByGroup: Record<string, Offers> = groupBy(favoriteOffers, (offer: OfferType) => offer.city.name);

  return (
    <div className="page">
      <Header />
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
