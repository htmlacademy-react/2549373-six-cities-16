import { CityLink } from '../types/city';

export const capitalizeFirstLetter = (str: string): string => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

export function groupBy<T, K extends string | number | symbol>(list: T[], getKey: (item: T) => K): Record<K, T[]> {
  return list.reduce((result, currentItem) => {
    const key = getKey(currentItem);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(currentItem);
    return result;
  }, {} as Record<K, T[]>);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

export function getRandomCity(cities: CityLink[]): CityLink {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}

export function pluralize(count: number): string {
  if (count < 0) {
    return '';
  }
  return count > 1 ? 's' : '';
}
