const Cities = {
  Paris: { id: 'paris', name: 'Paris' },
  Cologne: { id: 'cologne', name: 'Cologne' },
  Brussels: { id: 'brussels', name: 'Brussels' },
  Amsterdam: { id: 'amsterdam', name: 'Amsterdam' },
  Hamburg: { id: 'hamburg', name: 'Hamburg' },
  Dusseldorf: { id: 'dusseldorf', name: 'Dusseldorf' },
} as const;

const enum AppRoute {
  Root = '/',
  Main = '/:cityId?',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}
const enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const UrlMarker = {
  CURRENT: 'pin-active.svg',
  DEFAULT: 'pin.svg',
} as const;

const PageType = {
  OFFER: 'offer',
  CITIES: 'cities',
  NEAR_PLACES: 'near-places',
  FAVORITES: 'favorites',
} as const;

enum SortOptionValue {
  Popular = 'popular',
  PriceLowToHigh = 'priceLowToHigh',
  PriceHighToLow = 'priceHighToLow',
  TopRated = 'topRated',
}

const SORT_OPTIONS = [
  { id: 1, title: 'Popular', value: SortOptionValue.Popular },
  { id: 2, title: 'Price: low to high', value: SortOptionValue.PriceLowToHigh },
  { id: 3, title: 'Price: high to low', value: SortOptionValue.PriceHighToLow },
  { id: 4, title: 'Top rated first', value: SortOptionValue.TopRated },
] as const;

enum Endpoint {
  Login = '/login',
  Offers = '/offers',
  Offer = '/offers/:id',
  Comments = '/comments/:offerId',
  Logout = '/logout',
  Favorites = '/favorite',
  Favorite = '/favorite/:offerId/:status',
}

export const RouteParams = {
  Id: ':id',
  OfferId: ':offerId',
  CityId: ':cityId',
  Status: ':status',
} as const;

enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

const NOT_FOUND_ERROR = 'NOT_FOUND_ERROR';

export {
  Cities,
  AppRoute,
  AuthStatus,
  SortOptionValue,
  PageType,
  UrlMarker,
  SORT_OPTIONS,
  Endpoint,
  RequestStatus,
  NOT_FOUND_ERROR,
};
