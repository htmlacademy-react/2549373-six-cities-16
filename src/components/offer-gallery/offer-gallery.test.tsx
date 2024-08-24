import { render } from '@testing-library/react';
import faker from 'faker';
import OfferGallery from './offer-gallery';

describe('OfferGallery Component', () => {
  it('should render the correct number of images', () => {
    const images = Array.from({ length: 7 }, () => `${faker.image.imageUrl()}-${faker.datatype.uuid()}`);

    const { getAllByTestId } = render(<OfferGallery images={images}/>);

    const renderedImages = getAllByTestId(/gallery-image-/);
    expect(renderedImages).toHaveLength(6);
  });

  it('should render images with the correct src attributes', () => {
    const images = [
      `${faker.image.imageUrl()}-${faker.datatype.uuid()}`,
      `${faker.image.imageUrl()}-${faker.datatype.uuid()}`
    ];

    const { getByTestId } = render(<OfferGallery images={images}/>);

    expect(getByTestId('gallery-image-0')).toHaveAttribute('src', images[0]);
    expect(getByTestId('gallery-image-1')).toHaveAttribute('src', images[1]);
  });
});
