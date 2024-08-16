import faker from 'faker';
import { State } from '../types/state.ts';
import { AuthStatus, Cities, RequestStatus, SortOptionValue } from '../const.ts';
import authSlice, { AuthInitialState } from '../store/slices/auth/auth.ts';
import commentsSlice, { CommentsInitialState } from '../store/slices/comments/comments.ts';
import favoritesSlice, { FavoritesInitialState } from '../store/slices/favorites/favorites.ts';
import offerSlice, { OfferInitialState } from '../store/slices/offer/offer.ts';
import offersSlice, { OffersInitialState } from '../store/slices/offers/offers.ts';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Review, Reviews } from '../types/reviews.ts';
import { FullOffer, OfferDetails, Offers, OfferType } from '../types/offers.ts';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services/api.ts';
import MockAdapter from 'axios-mock-adapter';

const axios = createAPI();
export const mockAxiosAdapter = new MockAdapter(axios);

export const middlewares = [thunk.withExtraArgument(axios)];

export const mockStore = configureMockStore<State, Action<string>, AppThunkDispatch>(middlewares);

export const extractActionsTypes = (actions: Action<string>[]): string[] =>
  actions.map(({ type }) => type);

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export function generateMockCity() {
  return {
    name: faker.address.city(),
    location: {
      latitude: parseFloat(faker.address.latitude()),
      longitude: parseFloat(faker.address.longitude()),
      zoom: faker.datatype.number({ min: 1, max: 20 }),
    },
  };
}

export function generateMockHost() {
  return {
    name: faker.name.findName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
  };
}

export function generateMockFullOffer(): FullOffer {
  return {
    id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    type: faker.random.arrayElement(['apartment', 'house', 'room', 'hotel']),
    price: faker.datatype.number({ min: 50, max: 500 }),
    city: generateMockCity(),
    location: {
      latitude: parseFloat(faker.address.latitude()),
      longitude: parseFloat(faker.address.longitude()),
      zoom: faker.datatype.number({ min: 1, max: 20 }),
    },
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
    description: faker.lorem.paragraph(),
    bedrooms: faker.datatype.number({ min: 1, max: 5 }),
    goods: [faker.commerce.productMaterial()],
    host: generateMockHost(),
    images: [faker.image.city()],
    maxAdults: faker.datatype.number({ min: 1, max: 10 }),
  };
}

export function generateMockOfferType(): OfferType {
  return {
    id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    type: faker.random.arrayElement(['apartment', 'house', 'room', 'hotel']),
    price: faker.datatype.number({ min: 50, max: 500 }),
    city: generateMockCity(),
    location: {
      latitude: parseFloat(faker.address.latitude()),
      longitude: parseFloat(faker.address.longitude()),
      zoom: faker.datatype.number({ min: 1, max: 20 }),
    },
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
    previewImage: faker.image.city(),
  };
}

export function generateMockOffers(count: number): Offers {
  return Array.from({ length: count }, generateMockOfferType);
}

export function generateMockReview(): Review {
  return {
    id: faker.datatype.uuid(),
    date: faker.date.past().toISOString(),
    user: {
      name: faker.name.findName(),
      avatarUrl: faker.image.avatar(),
      isPro: faker.datatype.boolean(),
    },
    comment: faker.lorem.sentences(),
    rating: faker.datatype.number({ min: 1, max: 5 }),
  };
}

export function generateMockReviews(count: number): Reviews {
  return Array.from({ length: count }, generateMockReview);
}

export function generateMockOfferDetails(): OfferDetails {
  return {
    offer: generateMockFullOffer(),
    nearby: generateMockOffers(3),
    comments: generateMockReviews(5),
  };
}

export function getRandomFavoriteOffers(count: number): Offers {
  const offers = generateMockOffers(count);
  return offers
    .map((offer) => ({
      ...offer,
      isFavorite: faker.datatype.boolean(),
    }))
    .filter((offer) => offer.isFavorite);
}

export type MockItem = {
  id: number;
  category: 'paris' | 'cologne' | 'brussels';
};

export function generateMockItems(count: number): MockItem[] {
  return Array.from({ length: count }, (): MockItem => ({
    id: faker.datatype.number(),
    category: faker.random.arrayElement(['paris', 'cologne', 'brussels']),
  }));
}

export const defaultState = {
  [authSlice.name]: <AuthInitialState>{
    authorizationStatus: AuthStatus.Unknown,
    requestStatus: RequestStatus.Idle,
    user: null,
  },
  [commentsSlice.name]: <CommentsInitialState>{
    comments: [],
    requestStatus: RequestStatus.Idle,
  },
  [favoritesSlice.name]: <FavoritesInitialState>{
    favorites: [],
  },
  [offerSlice.name]: <OfferInitialState>{
    offer: null,
    nearby: null,
    requestStatus: RequestStatus.Idle,
    errorMessage: null,
  },
  [offersSlice.name]: <OffersInitialState>{
    cityName: { id: Cities.Paris.id, name: Cities.Paris.name },
    offers: [],
    sortOption: SortOptionValue.Popular,
    requestStatus: RequestStatus.Idle,
    currentOffer: null,
  },
};

export const makeFakeState = (): State => {
  const state = {
    ...defaultState,
  };

  state[authSlice.name]['user'] = {
    name: faker.name.findName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
    email: faker.internet.email(),
    token: faker.datatype.uuid(),
  };

  state[commentsSlice.name]['comments'] = generateMockReviews(5);
  const mockOfferDetails = generateMockOfferDetails();
  state[offerSlice.name]['offer'] = mockOfferDetails.offer;
  state[offerSlice.name]['nearby'] = mockOfferDetails.nearby;

  return state;
};

export const mockFavoriteStatusTrue = (offerId: string) => ({ id: offerId, status: 1 });

export const mockFavoriteStatusFalse = (offerId: string) => ({ id: offerId, status: 0 });

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  ...defaultState,
  ...(initialState ?? {}),
});
