import { JSX } from 'react';

export type OfferGalleryProps = {
  images: string[];
};

function OfferGallery({ images }: OfferGalleryProps): JSX.Element {
  const displayedImages = images.slice(0, 6);
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {displayedImages.map((image, index) => (
          <div className="offer__image-wrapper" key={image}>
            <img className="offer__image" src={image} alt="Photo studio" data-testid={`gallery-image-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferGallery;
