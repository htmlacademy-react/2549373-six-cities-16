import { Location } from './offers.ts';
import { Cities } from '../const.ts';

export type City = {
  name: string;
  location: Location;
}

export type CityName = typeof Cities[keyof typeof Cities]['name'];
export type CityId = typeof Cities[keyof typeof Cities]['id'];

export type CityLink = {
  id: CityId;
  name: CityName;
};
