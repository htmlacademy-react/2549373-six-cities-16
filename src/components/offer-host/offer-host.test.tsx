import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import OfferHost from './offer-host';
import { generateMockHost } from '../../utils/moks.ts';

describe('OfferHost Component', () => {
  it('should render host information correctly', () => {
    const mockHost = generateMockHost();
    const mockDescription = 'Great place to stay; Close to public transport; Friendly environment';

    render(<OfferHost host={mockHost} description={mockDescription} />);

    expect(screen.getByText(mockHost.name)).toBeInTheDocument();

    const avatarImage = screen.getByAltText('Host avatar');
    expect(avatarImage).toHaveAttribute('src', mockHost.avatarUrl);
    expect(avatarImage).toHaveAttribute('width', '74');
    expect(avatarImage).toHaveAttribute('height', '74');

    if (mockHost.isPro) {
      expect(screen.getByText('Pro')).toBeInTheDocument();
    }

    const descriptionParagraphs = mockDescription.split(';');
    descriptionParagraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph.trim())).toBeInTheDocument();
    });
  });

  it('should not display "Pro" status when host is not a professional', () => {
    const mockHost = generateMockHost();
    mockHost.isPro = false;

    const mockDescription = 'Nice place with good vibes; Quiet neighborhood';

    render(<OfferHost host={mockHost} description={mockDescription} />);

    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
  });
});
