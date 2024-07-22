const Cities = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
} as const;

const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

const enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const URL_MARKER_CURRENT = 'img/pin-active.svg';
const URL_MARKER_DEFAULT = 'img/pin.svg';
const QUERY_PARAMETER = 'slug';
const FAVORITES = 'favorites';
const NEAR_PLACES = 'near-places';
const CITIES = 'cities';
const OFFER = 'offer';

export {
  Cities,
  AppRoute,
  AuthStatus,
  URL_MARKER_CURRENT,
  URL_MARKER_DEFAULT,
  QUERY_PARAMETER,
  FAVORITES,
  NEAR_PLACES,
  CITIES,
  OFFER,
};
