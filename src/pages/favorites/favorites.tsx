import { JSX, useEffect } from 'react';
import classNames from 'classnames';
import Logo from '../../components/logo/logo';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import PageTitle from '../../components/page-title/page-title';
import { fetchFavoritesAction } from '../../store/async-thunk/favorites/favorites';
import { getFavorites } from '../../store/selectors/favorites/favorites';

function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavorites);
  const isEmpty = favoriteOffers.length === 0;

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  return (
    <div className={classNames('page', { 'page--favorites-empty': isEmpty })}>
      <PageTitle title={isEmpty ? '6 cities: favorites empty' : '6 cities: favorites'}/>
      <Header/>
      <main className={classNames('page__main', 'page__main--favorites', { 'page__main--favorites-empty': isEmpty })}>
        <div className="page__favorites-container container">
          {isEmpty ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList />
            </section>
          )}
        </div>
      </main>
      <footer className={classNames('footer', { 'container': !isEmpty })}>
        <Logo width="64" height="33"/>
      </footer>
    </div>
  );
}

export default Favorites;
