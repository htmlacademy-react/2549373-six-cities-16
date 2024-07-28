import { OfferType } from '../../types/offers.ts';
import { useAppSelector } from '../index.ts';
import { useEffect, useState } from 'react';
import { groupBy } from '../../functions.ts';
import { SortOptionValue } from '../../const.ts';

export const sortOffers = (offers: OfferType[], sortOption: SortOptionValue): OfferType[] => {
  switch (sortOption) {
    case SortOptionValue.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortOptionValue.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortOptionValue.TopRated:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers; // Default: 'popular'
  }
};

const useSortedCityOffers = (cityName: string): OfferType[] => {
  const offers = useAppSelector((state) => state.offers);
  const sortOption = useAppSelector((state) => state.sortOption);
  const [sortedOffers, setSortedOffers] = useState<OfferType[]>([]);

  useEffect(() => {
    const offersByGroup = groupBy(offers, (offer: OfferType) => offer.city.name);
    const cityOffers = offersByGroup[cityName] || [];
    const sortedCityOffers = sortOffers(cityOffers, sortOption);
    setSortedOffers(sortedCityOffers);
  }, [cityName, offers, sortOption]);

  return sortedOffers;
};

export default useSortedCityOffers;
