import { describe, expect, it } from 'vitest';
import { capitalizeFirstLetter, formatDate, groupBy } from './utils';
import { generateMockItems, MockItem } from './moks';

describe('Functions utils:', () => {
  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of a word', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
    });

    it('should return an empty string when input is empty', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });
  });

  describe('Function: groupBy', () => {
    it('should group items by category', () => {
      const mockItems: MockItem[] = generateMockItems(10);
      const result = groupBy(mockItems, (item: MockItem) => item.category);

      expect(Object.keys(result)).toEqual(expect.arrayContaining(['paris', 'cologne', 'brussels']));

      Object.values(result).forEach((group) => {
        expect(Array.isArray(group)).toBe(true);
      });
    });

    it('should return an empty object when no items are provided', () => {
      const result = groupBy([], (item: MockItem) => item.category);
      expect(result).toEqual({});
    });
  });

  describe('formatDate', () => {
    it('should format the date correctly in "MMMM YYYY" format', () => {
      const result = formatDate('2023-08-15T12:00:00Z');
      expect(result).toBe('August 2023');
    });

    it('should format another date correctly in "MMMM YYYY" format', () => {
      const result = formatDate('2022-01-01T00:00:00Z');
      expect(result).toBe('January 2022');
    });

    it('should return "Invalid Date" if the input date is invalid', () => {
      const result = formatDate('invalid-date');
      expect(result).toBe('Invalid Date');
    });

    it('should return "Invalid Date" if the input is an empty string', () => {
      const result = formatDate('');
      expect(result).toBe('Invalid Date');
    });
  });
});
