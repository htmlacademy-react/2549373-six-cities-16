import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FavoriteButton from './favorite-button';
import { PageType } from '../../const';

describe('FavoriteButton Component', () => {
  it('should render correctly when not favorite and on CITIES page', () => {
    render(<FavoriteButton isFavorite={false} onToggleFavorite={() => {}} pageType={PageType.CITIES} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('place-card__bookmark-button');

    const iconElement = buttonElement.querySelector('svg');
    expect(iconElement).toHaveClass('place-card__bookmark-icon');
    expect(iconElement).toHaveAttribute('width', '18');
    expect(iconElement).toHaveAttribute('height', '19');
  });

  it('should render correctly when favorite and on OFFER page', () => {
    render(<FavoriteButton isFavorite onToggleFavorite={() => {}} pageType={PageType.OFFER} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('offer__bookmark-button--active');

    const iconElement = buttonElement.querySelector('svg');
    expect(iconElement).toHaveClass('offer__bookmark-icon');
    expect(iconElement).toHaveAttribute('width', '31');
    expect(iconElement).toHaveAttribute('height', '33');
  });
});
