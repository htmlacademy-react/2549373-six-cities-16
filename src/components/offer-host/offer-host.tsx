import { JSX } from 'react';
import { Host } from '../../types/offers';
import classNames from 'classnames';

export type OfferHostProps = {
  host: Host;
  description: string;
}

function OfferHost({ host, description }: OfferHostProps): JSX.Element {
  const descriptionParagraphs = description.split(';');

  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div
          className={classNames('offer__avatar-wrapper', 'user__avatar-wrapper', { 'offer__avatar-wrapper--pro': host.isPro })}
        >
          <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
        </div>
        <span className="offer__user-name">{host.name}</span>
        {host.isPro && <span className="offer__user-status">Pro</span>}
      </div>
      <div className="offer__description">
        {descriptionParagraphs.map((paragraph) => (
          <p className="offer__text" key={paragraph.trim()}>{paragraph.trim()}</p>
        ))}
      </div>
    </div>
  );
}

export default OfferHost;
