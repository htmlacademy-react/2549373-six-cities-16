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

export const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleString('default', options);
  return capitalizeFirstLetter(formattedDate.replace(' г.', ''));
};
