import { OfferType } from '../../types/offers';
import { useAppSelector } from '../index';
import { useMemo } from 'react';
import { groupBy } from '../../utils/utils';
import { SortOptionValue } from '../../const';
import { CityName } from '../../types/city';

export const sortOffers = (offers: OfferType[], sortOption: SortOptionValue): OfferType[] => {
  switch (sortOption) {
    case SortOptionValue.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortOptionValue.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortOptionValue.TopRated:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

const useSortedCityOffers = (cityName: CityName): OfferType[] => {
  const offers = useAppSelector((state) => state.offers.offers);
  const sortOption = useAppSelector((state) => state.offers.sortOption);

  const offersByGroup = useMemo(() => groupBy(offers, (offer: OfferType) => offer.city.name), [offers]);
  const cityOffers = useMemo(() => offersByGroup[cityName] || [], [offersByGroup, cityName]);
  const sortedCityOffers = useMemo(() => sortOffers(cityOffers, sortOption), [cityOffers, sortOption]);

  return sortedCityOffers;
};

export default useSortedCityOffers;
