import {JSX} from 'react';

type FavoriteProps = {
  isFavorite: boolean;
}

function Favorite({isFavorite}: FavoriteProps): JSX.Element {
  const classes = ['place-card__bookmark-button', 'button'];
  if (isFavorite) {
    classes.push('place-card__bookmark-button--active');
  }

  return (
    <button className={classes.join(' ')} type="button">
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use href="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default Favorite;