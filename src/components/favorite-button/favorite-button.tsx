import { JSX, useState } from 'react';
import classNames from 'classnames';

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggleFavorite: (isFavorite: boolean) => void;
}

function FavoriteButton({ isFavorite, onToggleFavorite }: FavoriteButtonProps): JSX.Element {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleButtonClick = () => {
    const newFavoriteStatus = !favorite;
    setFavorite(newFavoriteStatus);
    onToggleFavorite(newFavoriteStatus);
  };

  return (
    <button
      className={classNames('place-card__bookmark-button', 'button', { 'place-card__bookmark-button--active': favorite })}
      type="button"
      onClick={handleButtonClick}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use href="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;

