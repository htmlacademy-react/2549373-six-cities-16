import {Cities} from '../const.ts';
import {Location} from './offers.ts';

export type CityName = typeof Cities[keyof typeof Cities];

export type City = {
  name: string;
  location: Location;
}
