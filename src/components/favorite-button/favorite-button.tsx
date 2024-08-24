import { JSX, memo, useState } from 'react';
import classNames from 'classnames';
import { PageType } from '../../const';

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggleFavorite: (isFavorite: boolean) => void;
  pageType?: typeof PageType[keyof typeof PageType];
}

function FavoriteButton({ isFavorite, onToggleFavorite, pageType = PageType.CITIES }: FavoriteButtonProps): JSX.Element {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleButtonClick = () => {
    const newFavoriteStatus = !favorite;
    setFavorite(newFavoriteStatus);
    onToggleFavorite(newFavoriteStatus);
  };

  const buttonClass = classNames({
    'place-card__bookmark-button': pageType !== PageType.OFFER,
    'offer__bookmark-button': pageType === PageType.OFFER,
    'button': true,
    'place-card__bookmark-button--active': favorite && pageType !== PageType.OFFER,
    'offer__bookmark-button--active': favorite && pageType === PageType.OFFER,
  });

  const iconClass = classNames({
    'place-card__bookmark-icon': pageType === PageType.CITIES,
    'offer__bookmark-icon': pageType === PageType.OFFER,
  });

  const iconWidth = pageType === PageType.OFFER ? 31 : 18;
  const iconHeight = pageType === PageType.OFFER ? 33 : 19;

  return (
    <button
      className={buttonClass}
      type="button"
      onClick={handleButtonClick}
      data-testid='favorite-button'
    >
      <svg className={iconClass} width={iconWidth} height={iconHeight} data-testid="favorite-icon">
        <use href="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

const MemoizedFavoriteButton = memo(FavoriteButton);
export default MemoizedFavoriteButton;

