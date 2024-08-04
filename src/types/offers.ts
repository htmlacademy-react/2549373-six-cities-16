import { City } from './city.ts';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type FullOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: [string];
  host: Host;
  images: [string];
  maxAdults: number;
}

export type OfferType = {
  previewImage: string;
} & Omit<FullOffer, 'description' | 'bedrooms' | 'goods' | 'host' | 'images' | 'maxAdults'>

export type Offers = OfferType[];
